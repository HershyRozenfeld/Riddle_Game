import readlineSync from 'readline-sync';

export default function Riddle(id, name, taskDescription, correctAnswer){
    this.id = id;
    this.name = name;
    this.taskDescription = taskDescription;
    this.correctAnswer = correctAnswer;
    this.ask = function(){
        while(!this.check(readlineSync.question(this.taskDescription))){
            console.log("Your answer is incorrect");
        }
        console.log("Your answer is correct!");
    }
    this.check = function(num){
        return num == this.correctAnswer ? true : false;
    }
}
