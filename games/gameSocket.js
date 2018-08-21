const Game = require('./game');
const members = require('../members/members');

let connections = [];

const correctResponses = ["You're awesome!", "Way to go!!", "Keep up the good work!"];
const incorrectResponses = ["You'll get it next time!", "Don't give up!", "Your hard work will pay off!"];

module.exports = function(http){
    const io = require('socket.io')(http);

    io.on('connection', socket => {
        console.log(connections);
        let referer = socket.handshake.headers.referer.split('/');
        let requestedGame = referer[referer.length - 1];
        
        let connection = {
            connectionId: socket.conn.id,
            socket: socket,
            time: 0,
            game: new Game(requestedGame, members)
        };
    
        connections.push(connection);
    
        console.log('Connection made', socket.conn.id);
    
        socket.on('start', () => {
            console.log('Staring game request recieved for socket: ' + socket.conn.id);
            let foundConnection;
            connections.find(connection => {
                if ( connection.connectionId === socket.conn.id){
                    foundConnection = connection;
                }
            })
    
            console.log('Starting game for socket: ' + foundConnection.socket.conn.id);
            foundConnection.socket.emit('started', {
                response: 'Start!',
                randomMembers: foundConnection.game.startGame()
            });

            setInterval(() => {
                foundConnection.time += 1;
                socket.emit('timer', foundConnection.time);
            }, 1000);
        });
    
        socket.on('guess', (guess) => {
            console.log(guess);
    
            let foundConnection;
            connections.find(connection => {
                if ( connection.connectionId === socket.conn.id){
                    foundConnection = connection;
                }
            });
    
            if (foundConnection.game.isCorrect(guess)){
                console.log('Wahoooooooooo!');

                foundConnection.game.score += 1;
                foundConnection.game.attempted += 1;
    
                socket.emit('correct', {
                    response: correctResponses[Math.floor(Math.random() * (correctResponses.length - 1))],
                    score: Math.floor((foundConnection.game.score / foundConnection.game.attempted) * 100),
                    randomMembers: foundConnection.game.nextRound()
                });
            } else {
                console.log('Try again!');

                foundConnection.game.attempted += 1;

                socket.emit('incorrect', {
                    response: incorrectResponses[Math.floor(Math.random() * (incorrectResponses.length - 1))],
                    score: Math.floor((foundConnection.game.score / foundConnection.game.attempted) * 100)
                })
            }
        });

        socket.on('disconnect', () => {
            console.log(connections.length);

            connections = connections.filter(connection => connection.connectionId !== socket.conn.id);
        });
    });
};