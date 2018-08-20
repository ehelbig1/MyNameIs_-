const putAFaceToTheName = require('./putafacetothename/putafacetothename');
const whichMatt = require('./whichmatt/whichmatt');

class Game{

    constructor(requestedGame){
        console.log('new game created');
        this.score = 0;
        this.attempted = 0;
        this.startTime = Date.now();
        this.requestedGame = this.createGame(requestedGame);
    }

    createGame(requestedGame){
        if (requestedGame === 'putafacetothename'){
            return new putAFaceToTheName();
        } else if (requestedGame === 'whichmatt'){
            return new whichMatt();
        }
    }

    startGame(){
        return this.requestedGame.randomMembers;
    }

    nextRound(){
        this.requestedGame.nextRound();
        return this.requestedGame.randomMembers;
    }

    isCorrect(guess){
        return this.requestedGame.isCorrect(guess);
    }
}

module.exports = Game;