const members = require('../../members/members');

class putAFaceToTheName{
    
    constructor(){
        this.randomMembers = members.findRandomMembers(6);
        this.currentMemberName = this.randomMembers.currentMemberName;
        console.log('New putAFaceToTheName game started!');
    }

    nextRound(){
        this.randomMembers = members.findRandomMembers(6);
        this.currentMemberName = this.randomMembers.currentMemberName;
    }

    isCorrect(guess){
        if (guess === this.currentMemberName){
            return true;
        }

        return false;
    }
}

module.exports = putAFaceToTheName;