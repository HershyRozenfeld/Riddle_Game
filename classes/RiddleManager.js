import readlineSync from 'readline-sync';

export default function RiddleManager(id, name, taskDescription, correctAnswer){
    this.id = id;
    this.name = name;
    this.taskDescription = taskDescription;
    this.correctAnswer = correctAnswer;
    this.askManager = function(){
        this.start();
        while(!this.check(this.ask())){
            console.log("Your answer is wrong");
        }
        console.log("Your answer is correct!");
        return this.endAndCalculation();
    }
    this.ask = function(){
        return readlineSync.question(`${this.taskDescription}: `)
    }
    this.check = function(num){
        return num == this.correctAnswer ? true : false;
    }
    this.start = function(){
        this.startTime = Date.now()
    }
    this.endAndCalculation = function(){
        this.endTime = Date.now()
        const durationMs = this.endTime - this.startTime;
        return Math.floor(durationMs / 1000);
    }
}
