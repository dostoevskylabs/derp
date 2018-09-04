const api               = require('./api');
const wrapper           = require('./apiWrapper');
const gui               = require('./gui');
const readline          = require('readline');

const IO = readline.createInterface({ input: process.stdin, output: process.stdout });
const responsePrefix = '\u001b[2;36m→\u001b[0m';

IO.setPrompt('\u001b[2;35m[derp] » \u001b[0m', 8);
IO.prompt();

function manageQueue( data ){
    // handle responses from pipeline
}

function handleCommand ( args ) {   
    switch ( args[0] ) {
        case 'exit': case 'quit':
            console.log(responsePrefix + ' goodbye!');
            return IO.close();
        break;

        case 'init':
            console.log(responsePrefix + ' doing init');
            init(); // spawns servers, etc
        break;

        case 'connect-api':
            console.log(responsePrefix + ' connecting api');
            connectApi();
        break;

        case 'execute':
            console.log(responsePrefix + ' executing command on all nodes');
            api.execute( 'command', manageQueue);
        break;

        default:
            console.log(responsePrefix + ` Unrecognized command: ${args[0]}`);
    }
    IO.prompt();
}

IO.on('line', ( input ) => handleCommand( input.split(' ') ) );

const settings = {
    providers: ["digitalocean"],
    numberOfServers : 5
};

function init ( data ) {
    (function spawnInstance( iter ){
        setTimeout( function( iter ) {
            iter--;
            let selectRandomApi = Object.keys(settings['providers'])[Math.floor(Math.random() * Array.from(Object.keys(settings['providers'])).length )];
    
            let apiSwarm = new wrapper[selectRandomApi];
    
            apiSwarm.createServer( init );
    
        }, 3000);
    })( settings['numberOfServers']);
}

function connectApi () {}
function disconnectApi () {}
