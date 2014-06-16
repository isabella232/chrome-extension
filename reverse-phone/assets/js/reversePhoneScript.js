var arrayOfNumbers = [];
var regex =  /\d*[\- \+ \( \_ \ \" \' \  \? \= \": \w+]*[0-9][0-9][0-9][-\s\.\)\ ]*[0-9][0-9][0-9][-\s\.]*[0-9][0-9][0-9][0-9]*/g;
newBody = document.body.innerHTML;
var hostname = document.location.hostname;
if (hostname.indexOf('whitepages')== -1)
{
  var i = 0;
  do
  {
    temp = regex.exec(newBody); 
      if (temp != null){
        if (typeof temp == 'object'){
          if (temp[0].length != 0){
            var tempPhone = temp[0].trim();
            var regex3 =  /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4})$/;
            if (temp[0].indexOf('href') == -1){

              if (tempPhone.indexOf(' ') != -1){
                var sArr =  tempPhone.split(" ");
                if (regex3.test(sArr[0]) == true){
                  arrayOfNumbers[i] = sArr[0];
                }
                if (regex3.test(sArr[1]) == true){
                  arrayOfNumbers[i] = sArr[1];
                }

              }else{
                if (tempPhone.indexOf(':') == -1 || tempPhone.indexOf('"') == -1){
                  if (tempPhone.indexOf(' ') != -1){
                    if (regex3.test(tempPhone) == true){
                      arrayOfNumbers[i] =tempPhone;
                    }
                  }else if (tempPhone.indexOf('-') != -1){
                    if (regex3.test(tempPhone) == true){
                      arrayOfNumbers[i] =tempPhone;
                    }
                  }

                }
              }

            }
          }


        }
        i++

      }


  }
  while (temp)
  arrayOfUniqueNumbers = arrayOfNumbers;
  for (var i = 0; i < arrayOfUniqueNumbers.length; i++)
  {
    if(typeof arrayOfNumbers[i] != 'undefined'){

      var link = "https://pro.lookup.whitepages.com/phones?number=" + arrayOfUniqueNumbers[i];
      newBody = newBody.replace(arrayOfUniqueNumbers[i], arrayOfUniqueNumbers[i] + "&nbsp;<a href='#' onclick='window.open( "+'"'+link+'"' +" , \"_blank\" ,\"width=1000, height=650\");'><img src='http://54.241.23.28:8080/icon16.png' /></a>");
    };
  }
  document.body.innerHTML = newBody;
}


function ArrNoDupe(a) {
  var temp = {};
  for (var i = 0; i < a.length; i++)
    temp[a[i]] = true;
  var r = [];
  for (var k in temp)
    r.push(k);
  return r;
}