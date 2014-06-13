var arrayOfNumbers = [];
var regex =  /\d*[\- \+ \( \_ \ \" \' \  \? \= \": \Call ]*[0-9 +][0-9][0-9][-\s\.\)\ ]*[0-9][0-9][0-9][-\s\.]*[0-9][0-9][0-9][0-9]*/g;
newBody = document.body.innerHTML;
var hostname = document.location.hostname;
if (hostname.indexOf('whitepages')== -1)
{
  var i = 0;
  do
  {
    temp = regex.exec(newBody);
    if (temp != null)
      if (temp != null){
        if (typeof temp == 'object'){
          if (temp[0].length != 0){
            if (temp[0].length > 9 && temp[0].length <= 16){
              var strPhone = temp[0];
              strPhone = strPhone.trim();
              //console.log(strPhone.charAt(0)); 		   
              if ( strPhone.charAt(0) != "=" && strPhone.charAt(0) != "_" && strPhone.charAt(0) != '"' ){
                strPhone = strPhone.trim();
                strPhone =  strPhone.replace(/:/g, "");
                strPhone = strPhone.trim();

                if (strPhone.indexOf(' ') == -1){
                  // have no white space in phone
                  // 1234567890  
                  if (strPhone.length > 10 && strPhone.length <=16){
                    // for . phones
                    // 123.456.7890
                    if (strPhone.indexOf(".") != -1){
                      var dotArr =  strPhone.split(".");
                      if (dotArr.length == 3 && dotArr[0].length == 3 && dotArr[1].length == 3 && dotArr[2].length == 4){
                        arrayOfNumbers[i] = strPhone;
                      }
                    }
                    // for - phones
                    // 123-456-7890 or 1-123-456-7890 or +1-123-456-7890				  
                    if (strPhone.indexOf("-") != -1){
                      var dhArr =  strPhone.split("-");
                      if (dhArr.length == 3 && dhArr[0].length == 3 && dhArr[1].length == 3 && dhArr[2].length == 4){
                        // 123-456-7890
                        arrayOfNumbers[i] = strPhone;
                      }

                      if (dhArr.length == 4 && dhArr[0].length == 1 && dhArr[1].length == 3 && dhArr[2].length == 3 && dhArr[3].length == 4){
                        // 1-123-456-7890 
                        arrayOfNumbers[i] = strPhone;
                      }

                      if (dhArr.length == 4 && dhArr[0].length == 2 && dhArr[0].charAt(0) == "+" && dhArr[1].length == 3 && dhArr[2].length == 3 && dhArr[3].length == 4){
                        //+1-123-456-7890
                        arrayOfNumbers[i] = strPhone;
                      }
                    }

                    //  (123)4567893 
                    if (strPhone.indexOf("(") != -1){
                      if (strPhone.indexOf(")") == 4){
                        var brArr =  strPhone.split(")");
                        if (brArr[1].length == 7){
                          arrayOfNumbers[i] = strPhone;
                        }
                      }
                    }
                  }
                }else{
                  // have white space in phone
                  // (123) 4567892 or (123) 456-7892 or (123) 456 7892  or 1 315 636 4821
                  //console.log(strPhone);  
                  var wsArr =  strPhone.split(" ");

                  if (wsArr.length == 2 && wsArr[0].length == 5 && wsArr[1].length == 7){
                    // (123) 4567892 
                    if (wsArr[0].indexOf("(") != -1){
                      arrayOfNumbers[i] = strPhone;
                    }
                  }

                  if (wsArr.length == 4 && wsArr[0].length == 1 && wsArr[0].charAt(0) == 1 && wsArr[1].length == 3 && wsArr[2].length == 3 && wsArr[3].length == 4){
                    // 1 315 636 4821  
                    arrayOfNumbers[i] = strPhone;
                  }

                  if (wsArr.length == 3 && wsArr[0].length == 3 && wsArr[1].length == 3 && wsArr[2].length == 4){
                    //  123 456 7893 
                    arrayOfNumbers[i] = strPhone;
                  }

                  if (wsArr.length == 2 && wsArr[0].length == 5 && wsArr[1].length == 8){
                    //  (123) 456-7892
                    if (wsArr[0].indexOf("(") != -1){

                      if (wsArr[1].indexOf("-") != -1){
                        var wsArr2 =  wsArr[1].split("-");
                        if (wsArr2.length == 2 && wsArr2[0].length == 3 && wsArr2[1].length == 4){
                          arrayOfNumbers[i] = strPhone;
                        }
                      }

                    }
                  }

                  if (wsArr.length == 3 && wsArr[0].length == 5 && wsArr[1].length == 3 && wsArr[2].length == 4){
                    // (123) 456 7892 
                    if (wsArr[0].indexOf("(") != -1){
                      arrayOfNumbers[i] = strPhone;
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
  //arrayOfUniqueNumbers = ArrNoDupe(arrayOfNumbers);
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