var quesOperations =
    {
        quesList :[],
        addQues(quesNo,ques,option1,option2,option3,option4,rightAnswer,marks){
            
            var q = new Question(quesNo,ques,option1,option2,option3,option4,rightAnswer,marks);
            this.quesList.push(q);
            
        },
        search(qno)
        {
           return(this.quesList.findIndex((quesObj)=>{return quesObj.quesNo == qno})); 
        },
        mark(qno)
        {
            this.quesList[this.search(qno)].markForDelete = !this.quesList[this.search(qno)].markForDelete;
           // selectedItem.toggleDelete();
        },
        deleteRecords()
        {
            this.quesList = this.quesList.filter((quesObj)=>quesObj.markForDelete==false);
        },
        totalMarks()
        {
            var total=0;
            for(ques of this.quesList)
                {
                    total+=Number(ques.marks);
                }
            return total;
        },
        calMarks()
        {
            var marksObtained = 0;
            for(ques of this.quesList)
                {
                    if(ques.markedOption==ques.rightAnswer)
                        {
                            marksObtained+=Number(ques.marks);
                        }
                }
            return marksObtained;
        },
        refreshMarkedAnswers()
        {
            for(ques of this.quesList)
                {
                    ques.markedOption='';
                }
        }
    
    };