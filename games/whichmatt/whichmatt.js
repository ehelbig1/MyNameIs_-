const members = require('../../members/members');

class WhichMatt{

    constructor(){
        this.randomMembers = members.findMatts(3);
        this.currentMemberName = this.randomMembers.currentMemberName;
        console.log('New whichMatt game started!');
    }

    nextRound(){
        this.randomMembers = members.findMatts(3);
        this.currentMemberName = this.randomMembers.currentMemberName;
    }

    isCorrect(guess){
        if (guess === this.currentMemberName){
            return true;
        }

        return false;
    }
}

module.exports = WhichMatt;