window.addEventListener('load',checkForQues)
if(localStorage.myQuestions)
    {
quesOperations.quesList = JSON.parse(localStorage.getItem('myQuestions'));
var quesCount=1;
    quesOperations.refreshMarkedAnswers();
    }

function checkForQues()
{
if(quesOperations.quesList.length==0)
    {   
        var noTest = document.createElement('h1');
        noTest.innerHTML = 'THERE ARE NO QUESTIONS TO DISPLAY!!!';
        noTest.style.textAlign = 'center';
       document.body.innerHTML = '';
        document.body.appendChild(noTest);
        
        
    }


else
    {bindEvents();}
}
    

var timer;
function bindEvents()
{   printQues(quesCount);
    var prevButton = document.getElementById('prev');
 prevButton.addEventListener('click',prevQues);
    var nextButton = document.getElementById('next');
 nextButton.addEventListener('click',nextQues)
    var submitButton = document.getElementById('submit');
submitButton.addEventListener('click',submitTest);
 
 
 var quesOptions = document.getElementsByClassName('options');
 for(option of quesOptions)
     option.addEventListener('click',saveOption);
 
 
 var minutes = document.getElementById('minutesLeft');
 var seconds = document.getElementById('secondsLeft');
//TIMERRRRRRR
 minutes.innerHTML = 0;
 seconds.innerHTML = 20; 
 
timer = window.setInterval(function(){

    if(seconds.innerHTML==0)
        {
            if(minutes.innerHTML>0)
                {
                    --minutes.innerHTML;
                    seconds.innerHTML=10;
                }
            else{
                alert('over');
                submitTest();
            }
        }
         --seconds.innerHTML;

        
},1000);
 
 
 
}

function printQues(quesCount)
{
    
    
    var currentQues = quesOperations.quesList[quesCount-1];

    for(property in currentQues)
        {
            if(property == 'markForDelete' || property=='rightAnswer' || property=='markedOption')
                continue;
            document.getElementById(property).innerHTML = currentQues[property];
        }
    
        if(currentQues.markedOption!='')
        {
            var quesOptions = document.getElementsByClassName('options');
            for(option of quesOptions)
                if(option.nextElementSibling.innerHTML==currentQues.markedOption)
                    {
                        option.checked = true;
                    }
        }
    else{
        document.getElementById('hiddenOption').checked = 'true';
    }
    
}


function prevQues()
{   if(quesCount-1 < 1)
        alert('THERE ARE NO MORE QUESTIONS BACK THERE!!!!');

    else
    {
        quesCount--;
    console.log('prev');
    printQues(quesCount);
    }
}

function nextQues()
{
      if(quesCount+1 > quesOperations.quesList.length)
        alert('THERE ARE NO MORE QUESTIONS!!!!');

    else
    {
        quesCount++;
    console.log('next');
    printQues(quesCount);
    }
    
}

function submitTest()
{                   
    window.clearInterval(timer);

     localStorage.myQuestions = JSON.stringify(quesOperations.quesList);
//var maxMarks = quesOperations.totalMarks();
//var marksObtained = quesOperations.calMarks();
  //  alert(marksObtained +"/"+maxMarks)
location.href='result.html'
}

function saveOption(event)
{
    console.log('option clicked : ' + event.srcElement.nextElementSibling.innerHTML);
    var currentQues = quesOperations.quesList[quesCount-1];
    currentQues.markedOption = event.srcElement.nextElementSibling.innerHTML;

}
        
