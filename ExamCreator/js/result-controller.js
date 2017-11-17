window.addEventListener('load',showResult);

function showResult()
{
if(localStorage.myQuestions) 
    quesOperations.quesList = JSON.parse(localStorage.getItem('myQuestions'));
    
    
var maxMarks = quesOperations.totalMarks();
var marksObtained = quesOperations.calMarks();
var myScore = marksObtained + '/' + maxMarks;
    
document.getElementById('score').innerHTML = myScore;

    


printRows();
}


function printRows()
{
    var tbody = document.getElementById('tbody');
   
    var index = 0;

    var questions = quesOperations.quesList;
    var newCell;
    var rightAns;
    var markedAns;
    for(q of questions)
        {
            index = 0;
            newRow = tbody.insertRow();
            rightAns = q.rightAnswer;
            markedAns = q.markedOption;
     for(property in q)
        {
            if(property=='markForDelete' || property=='rightAnswer' || property=='markedOption' )
                continue;
            
            newCell = newRow.insertCell(index);
            
            if(property == 'ques'){
            newCell.setAttribute('colspan','3');
            }
            
            if(q[property] == markedAns)
                {
                    newCell.style.border = '5px solid crimson';
                }
            
            if(q[property] == rightAns)
                {
                    newCell.className = 'rightAnswer';
                }
            newCell.innerHTML=q[property];
        index++;
            
        }   
        }
        
}
