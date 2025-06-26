export default function Player(id, name){
    this.id = id;
    this.name = name;
    this.time;
    this.check = function(num){
        return num == this.correctAnswer ? true : false;
    }
    this.recordTime = function(start, end){
        this.time = end - start;
    }
    this.showStats = function(){
        console.log(`Total time: ${this.time}`);
    }
}

