window.addEventListener('load',bindEvents);
var countVal;
var qno;
function bindEvents()
{
    var addButton = document.getElementById('add');
    addButton.addEventListener('click',addItem);
    
    countVal = document.getElementById('count');
    countVal.innerHTML = quesOperations.quesList.length;
    
    
    qno = document.getElementById('quesNo');
    qno.innerHTML = quesOperations.quesList.length + 1;
    
    var delButton = document.getElementById('delete');
    delButton.addEventListener('click',deleteRecords);
    delButton.disabled = true;
    
    var updateButton = document.getElementById('update');
    updateButton.addEventListener('click',updateItem);
    updateButton.disabled =true;

    var select = document.getElementById('rightAnswer');
    select.addEventListener('click',showOptions);
    
    var resetButton = document.getElementById('reset');
    resetButton.addEventListener('click',resetAll);
    
    var sortButton = document.getElementById('sort');
    sortButton.addEventListener('click',sortByMarks);
   
    var storeLocal = document.getElementById('slocal');
    storeLocal.addEventListener('click',saveLocal);
    
    
    var fetchLocal = document.getElementById('flocal');
    fetchLocal.addEventListener('click',loadLocal);

    var deleteAll = document.getElementById('clear');
    deleteAll.addEventListener('click',clearAll);
    
    var testButton = document.getElementById('takeTest');
    testButton.addEventListener('click',startTest);
}





function addItem()
{

    var quesNo = document.getElementById('quesNo').innerHTML;
    var ques = document.getElementById('ques').value;
    var option1 = document.getElementById('option1').value;
    var option2 = document.getElementById('option2').value;
    var option3 = document.getElementById('option3').value;
    var option4 = document.getElementById('option4').value;
    var rightAnswer = document.getElementById('rightAnswer').innerHTML;
    var marks = document.getElementById('marks').value;
    
    
    quesOperations.addQues(quesNo,ques,option1,option2,option3,option4,rightAnswer,marks);
    
    var lastProduct = quesOperations.quesList[quesOperations.quesList.length-1];
    addInTable(lastProduct);
    resetAll();
   
}

function addOperations(url,cls,qno,func)
{
    var image = document.createElement('img');
    image.src = url;
    image.className = cls;
    image.setAttribute('ques-no',qno);
    image.addEventListener('click',func);
    return image;
    
}

//var toDelete =[];

function deleteClick(event)
{
    var qno = event.srcElement.getAttribute('ques-no');
  //  toDelete.push(id);
    var clickedRow = event.srcElement.parentElement.parentElement;
 
    clickedRow.classList.toggle('selectedRow');
    quesOperations.mark(qno);
    
    
    showSelectedRows();
    
    //DISABLING OTHER BUTTONS
    var mainButtons = document.getElementsByClassName('mainbuttons');
    var selectedRow = document.getElementsByClassName('selectedRow');
    if(selectedRow.length){
        for(button of mainButtons)
        {
            if(button.id=='delete')
                button.disabled = false;
            else
                button.disabled = true;
        }
    }
    else{
        resetAll();
        
    }
}

var editQuesObj;

function editClick()
{
    
    var qno = event.srcElement.getAttribute('ques-no');
    var index = quesOperations.quesList.findIndex((quesObj)=>quesObj.quesNo==qno);
    editQuesObj = quesOperations.quesList[index];
    
    for(property in editQuesObj)
        {
            if(property == 'markForDelete' || property=='markedOption')
                continue;
            
           if(property == 'quesNo' || property=='rightAnswer')
           {
           document.getElementById(property).innerHTML=editQuesObj[property];  
               continue;
           }
           document.getElementById(property).value=editQuesObj[property];
        }
    
    
    
    //DISABLING OTHER BUTTONS
    var mainButtons = document.getElementsByClassName('mainbuttons');
    
    for(button of mainButtons)
        {
            if(button.id=='update')
                button.disabled = false;
            else
                button.disabled = true;
        }
    //alert("Edit is clicked!" + id)
}

function updateItem()
{

    for(property in editQuesObj)
        {
           if(property=='markForDelete'  || property=='markedOption')
           {
               continue;
               
           }
            
            if(property=='quesNo' || property=='rightAnswer')
                {
                editQuesObj[property]=document.getElementById(property).innerHTML;
         
                    continue;
                }
           editQuesObj[property]=document.getElementById(property).value;
        }
    
    resetAll();
    printTable();
    
}


function addInTable(last)
{   
    countVal.innerHTML = quesOperations.quesList.length;
    var tbody = document.getElementById('tbody');
    var newRow = tbody.insertRow();
    var index = 0;
    var newCell;
    var rightAns = last.rightAnswer;
    for(property in last)
        {   
            if(property=='markForDelete' || property=='rightAnswer'  || property=='markedOption')
                continue;
            
            newCell = newRow.insertCell(index);
            
            if(property == 'ques'){
            newCell.setAttribute('colspan','3');
            }
            
            if(last[property] == rightAns)
                {
                    newCell.className = 'rightAnswer';
                }
            newCell.innerHTML=last[property];
                            index++;
            
       
        }
    newCell = newRow.insertCell(index);
    newCell.appendChild(addOperations('images/delete.png','operationStyle',last.quesNo,deleteClick));
    newCell.appendChild(addOperations('images/edit.png','operationStyle',last.quesNo,editClick));
    
    

}

function printRows()
{
       countVal.innerHTML = quesOperations.quesList.length;
        qno.innerHTML = quesOperations.quesList.length + 1;
    var tbody = document.getElementById('tbody');
   
    var index = 0;

    var questions = quesOperations.quesList;
    var newCell;
    var rightAns;
    for(q of questions)
        {
            index = 0;
            newRow = tbody.insertRow();
            rightAns = q.rightAnswer;
            
     for(property in q)
        {
            if(property=='markForDelete' || property=='rightAnswer'  || property=='markedOption')
                continue;
            
            newCell = newRow.insertCell(index);
            
            if(property == 'ques'){
            newCell.setAttribute('colspan','3');
            }
            
            if(q[property] == rightAns)
                {
                    newCell.className = 'rightAnswer';
                }
            newCell.innerHTML=q[property];
        index++;
            
        }   
    newCell = newRow.insertCell(index);
    newCell.appendChild(addOperations('images/delete.png','operationStyle',q.quesNo,deleteClick));
    newCell.appendChild(addOperations('images/edit.png','operationStyle',q.quesNo,editClick));
        }
        
}

function printTable()
{
    var tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    printRows();
}

function deleteRecords()
{
   quesOperations.deleteRecords();
    setQuestionNumbers();
    resetAll();
   printTable();
  showSelectedRows();
}


function setQuestionNumbers()
{
    for(var i = 0 ; i < quesOperations.quesList.length ; ++i)
        {
            quesOperations.quesList[i].quesNo = i+1;
        }
    
}
function showSelectedRows()
{
    var srows = document.getElementById('srows');
    srows.innerHTML = document.getElementsByClassName('selectedRow').length;
}

  function showOptions()
{
    var list =  document.getElementById('optionList');
    list.innerHTML="";
    var index = 1;
    for(index=1;index<=4;++index)
        {
            var option = document.createElement('li');
            option.setAttribute('class','options');
            option.innerHTML = document.getElementById('option'+index).value;
            option.addEventListener('click',optionClicked);
            list.appendChild(option);
        }
   list.style.display = 'block';
}

function optionClicked(event)
{
    var right = event.srcElement.innerHTML;
var rightAnswerButton = document.getElementById('rightAnswer');
   // var optionList = document.getElementById('optionList');
    
    rightAnswerButton.nextElementSibling.style.display = 'none'; 
    rightAnswerButton.innerHTML=right;

}

function resetAll()
{
 qno.innerHTML = quesOperations.quesList.length + 1;
 document.getElementById('ques').value = '';
 document.getElementById('option1').value = '';
 document.getElementById('option2').value = '';
 document.getElementById('option3').value = '';
document.getElementById('option4').value = '';
document.getElementById('rightAnswer').innerHTML ='Select';
document.getElementById('marks').value = '';   
    
    //BUTTONS ENABLE DISABLE
    var mainButtons = document.getElementsByClassName('mainbuttons');
    
    for(button of mainButtons)
        {
            if(button.id=='delete' || button.id=='update')
                button.disabled = true;
            else
                button.disabled = false;
        }
}


function sortByMarks()
{
    quesOperations.quesList.sort((first,second)=>(first.marks-second.marks));
    setQuestionNumbers();
    printTable();
}

function saveLocal()
{
    localStorage.myQuestions = JSON.stringify(quesOperations.quesList);
}

function loadLocal()
{
    quesOperations.quesList = JSON.parse(localStorage.getItem('myQuestions'));
    printTable();
}


function clearAll()
{
quesOperations.quesList.splice(0,quesOperations.quesList.length);
    printTable();
    
}

function startTest()
{
     localStorage.myQuestions = JSON.stringify(quesOperations.quesList);
    location.href='TestPage.html';
}
