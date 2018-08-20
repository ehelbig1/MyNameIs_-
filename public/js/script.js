window.onload = function(){
    const socket = io();

    let response = this.document.getElementById('response');
    let timer = this.document.getElementById('timer');
    let score = this.document.getElementById('score');

    let button = this.document.getElementById('start');
    button.addEventListener('click', () => {
        socket.emit('start', 'guess');
    });

    socket.on('started', res => {
        console.log(res);

        button.parentElement.removeChild(button);

        let members = document.getElementsByClassName('member');

        for(let i = 0; i < members.length; i++){
            members[i].addEventListener('click', function(){
                let guess = this.querySelector('p').innerHTML;

                socket.emit('guess', guess);
            })
        }

        let currentMemberName = document.getElementById('currentMemberName');
        let headShots = document.getElementsByClassName('headshot');
        let possibleGuesses = document.getElementsByClassName('guess');

        currentMemberName.innerHTML = `Who's ${res.randomMembers.currentMemberName}`;

        for(i = 0; i < headShots.length; i++){
            headShots[i].src = res.randomMembers.randomMembers[i].headshot.url;
            possibleGuesses[i].innerHTML = `${res.randomMembers.randomMembers[i].firstName} ${res.randomMembers.randomMembers[i].lastName}`;
        }
    });

    socket.on('timer', time => {
        timer.innerText = `Timer: ${time}`;
    });

    socket.on('correct', res => {
        console.log(res);

        response.innerText = res.response;
        score.innerText =  `Score: ${res.score}%`;
        
        let currentMemberName = document.getElementById('currentMemberName');
        let headShots = document.getElementsByClassName('headshot');
        let possibleGuesses = document.getElementsByClassName('guess');

        currentMemberName.innerHTML = `Who's ${res.randomMembers.currentMemberName}`;

        for(i = 0; i < headShots.length; i++){
            headShots[i].src = res.randomMembers.randomMembers[i].headshot.url;
            possibleGuesses[i].innerHTML = `${res.randomMembers.randomMembers[i].firstName} ${res.randomMembers.randomMembers[i].lastName}`;
        }
    });

    socket.on('incorrect', res => {
        console.log(res);

        response.innerText = res.response;
        score.innerText = `Score ${res.score}%`;
    });

    window.onbeforeunload = function(event){
        socket.disconnect();
    }

    function startRound(gamePieces){
        
    }
}