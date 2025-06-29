import readlineSync from 'readline-sync';

export default function Player(){

    this.askName = function (){
    this.name = readlineSync.question('What is your name? ')
    console.log(`Hello ${this.name}`);
    }
    this.recordTime = function(start, end){
        this.time = end - start;
    }
    this.showStats = function(){
        console.log(`Total time: ${this.time}`);
    }
    this.askName();
}

