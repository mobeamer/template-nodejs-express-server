


function loadEmployee(employeeID)
{
  
  console.log("Loading EmployeeID: " + employeeID);
  
   var url = rootUrl + "/api/getAssignments.php?employeeID=" + employeeID;
   var self = this;
   
  $.ajax({
    type:'GET',
    url:url,
    success: function(dataPacket) {

        alert(dataPacket);

      }
    ,error: function(xhr, textStatus, errorThrown){
        console.log("Ajax Error: " + errorThrown);
     }
    });

}


function loadAssignments(employeeID)
{

  
  console.log("Loading Assignments: " + employeeID);
  
   var url = rootUrl + "/api/getAssignments.php?employeeID=" + employeeID;
   var self = this;
   console.log("url", url);
  
  $.ajax({
    type:'GET',
    url:url,
    success: function(dataPacket) {

        document.getElementById("div-assignment-contents").innerHTML = dataPacket;

      }
    ,error: function(xhr, textStatus, errorThrown){
        console.log("Ajax Error: " + errorThrown);
     }
    });

}





function loadSurveyResults(employeeID)
{

  
  console.log("Loading Survey Results: " + employeeID);
  
   var url = rootUrl + "/api/get-survey-results.php?employeeID=" + employeeID;
   var self = this;
   console.log("url", url);
  
  $.ajax({
    type:'GET',
    url:url,
    success: function(dataPacket) {

        document.getElementById("div-survey-results-contents").innerHTML = dataPacket;

      }
    ,error: function(xhr, textStatus, errorThrown){
        console.log("Ajax Error: " + errorThrown);
     }
    });

}





function submitForm(url, formClass)
{
    
    var elements = document.getElementsByClassName(formClass);
    var url = rootUrl + url + "?";
    var dataOut = [];
    for (var i = 0;i<elements.length;i++) 
    {
        var isRequired = elements[i].getAttribute("required");
                
        url+="&" + elements[i].id + "=" + elements[i].value
        dataOut.push({"varName":elements[i].id, "varVal":elements[i].value});
      
    }
  
    console.log("url:", url);
    //console.log(dataOut);
    
    $.ajax({
      type:'POST',
      url:url,
      dataOut: dataOut,
      success: function(dataPacket) {

          console.log("AJAX DataPacket:", dataPacket);

          document.getElementById("div-general-notification").innerHTML = dataPacket.msg;
        
          var elements = document.getElementsByClassName(formClass+"-id");
        
          elements[0].value = dataPacket.ID;
          for(var i=0;i<dataPacket.debug.length;i++)
          {
            console.log(dataPacket.debug[i]);
          }
        
        }
      ,error: function(xhr, textStatus, errorThrown){
          console.log("Ajax Error: " + errorThrown);
       }
      });

}

function answerQuestion(questionID, questionType, questionResponse, employeeID)
{
  
  if(questionType == "YN")
  {
    var y = document.getElementById("y_" + questionID);
    var n = document.getElementById("n_" + questionID);
    y.classList.remove("green");
    n.classList.remove("green");


    if(questionResponse == "Y")
    {
      y.classList.add("green");
    }

    if(questionResponse == "N")
    {
      n.classList.add("green");
    }  
  }
  
  if(questionType == "text-large")
  {
    questionResponse = document.getElementById("text_" + questionID).value;
  }
    
  
  var url = rootUrl + "/api/save-survey-question-answer.php?employeeID=" + employeeID;
  url+="&questionID=" + questionID;
  url+="&questionAnswer=" + questionResponse;
  
  var self = this;
  console.log("url", url);
  
  $.ajax({
      type:'POST',
      url:url,
      success: function(dataPacket) {

          document.getElementById("div-general-notification").innerHTML = dataPacket.msg;
        
          for(var i=0;i<dataPacket.debug.length;i++)
          {
            console.log(dataPacket.debug[i]);
          }
        
        }
      ,error: function(xhr, textStatus, errorThrown){
          console.log("Ajax Error: " + errorThrown);
       }
      });

  
  
}



function acceptLocation(locationID, status, employeeID)
{
  var y = document.getElementById("avail_y_" + locationID);
  var n = document.getElementById("avail_n_" + locationID);
  y.classList.remove("green");
  n.classList.remove("green");


  if(status == "Y")
  {
    y.classList.add("green");
  }

  if(status == "N")
  {
    n.classList.add("green");
  }  


    
  var url = rootUrl + "/api/save-location-availability.php?employeeID=" + employeeID;
  url+="&locationID=" + locationID;
  url+="&status=" + status;
  
  var self = this;
  console.log("url", url);
  
  $.ajax({
      type:'POST',
      url:url,
      success: function(dataPacket) {

          document.getElementById("div-general-notification").innerHTML = dataPacket.msg;
        
          for(var i=0;i<dataPacket.debug.length;i++)
          {
            console.log(dataPacket.debug[i]);
          }
        
        }
      ,error: function(xhr, textStatus, errorThrown){
          console.log("Ajax Error: " + errorThrown);
       }
      });

  
  
}


function setNotification(msg)
{
  document.getElementById("div-general-notification").innerHTML = msg;
}