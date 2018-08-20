const chai = require('chai');

chai.should();

const members = require('../members/members');

describe('Members', function(){
    describe('teamMembers', () => {
        it('should not be empty', () => {
            setTimeout(() => {
                members.teamMembers.length.should.be.above(0);
            }, 500);
        });
    });

    describe('currentTeamMember', function(){
        it('should not be empty', () => {
            setTimeout(() => {
                members.currentMemberName.exist;
            }, 500);
        });
    });
});