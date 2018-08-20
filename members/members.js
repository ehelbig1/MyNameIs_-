const https = require('https');

class Members{
    
    constructor(url){
        this.getMembers(url);
    }

    getMembers(url){
        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                this.teamMembers = JSON.parse(data);
            });

            res.on('error', (err) => {
                console.log(`Error: ${err.message}`);
            });
        })
    }

    findRandomMembers(num){
        this.randomMembers = [];
        this.currentMemberName;

        for(let i = 0; i < num; i++){
            this.randomMembers.push(this.teamMembers[Math.floor(Math.random() * (this.teamMembers.length - 1))]);
        };

        let currentMember = this.randomMembers[Math.floor(Math.random() * (num - 1))];
        this.currentMemberName = `${currentMember.firstName} ${currentMember.lastName}`;

        return {randomMembers: this.randomMembers,
            currentMemberName: this.currentMemberName
        };
    }

    findMembersByName(name){
        let members = [];
        
        this.teamMembers.find(member => { 
            if (member.firstName === name){
                members.push(member);
            }
        });

        return members;
    };

    findMemberById(id){
        let foundMember = {};

        this.teamMembers.find(member => {
            if (member.id === id){
                foundMember = member;
            }
        });

        return foundMember;
    }

    findMatts(num){
        let allMatts = [];
        let randomMembers = [];
        let currentMemberName;

        this.teamMembers.find(member => {
            if (member.firstName === 'Matt' || member.firstName === 'Matthew'){
                allMatts.push(member);
            }
        });

        for(let i = 0; i < num; i++){
            randomMembers.push(allMatts[Math.floor(Math.random() * (allMatts.length - 1))]);
        }

        let currentMember = randomMembers[Math.floor(Math.random() * (randomMembers.length - 1))];
        currentMemberName = `${currentMember.firstName} ${currentMember.lastName}`;

        return {
            randomMembers: randomMembers,
            currentMemberName: currentMemberName
        };
    }
}

module.exports = new Members(process.env.MEMBER_PROFILE_URL);