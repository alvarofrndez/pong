import * as consts from './constants/constants.js'
import Player from './player/player.js';
import Ball from './ball/ball.js';

let canvas = null;
let context = null;
let board = [];
let ball = new Ball(consts.BOARD_WIDTH / 2, consts.BOARD_HEIGTH / 2);
let players_y = (consts.BOARD_HEIGTH - 4);
let player_1 = new Player(1, players_y / 2 ,1)
let player_2 = new Player(consts.BOARD_WIDTH - 2, players_y / 2 ,2)

window.addEventListener('load', () => {
    // load all the componets when the page is loaded
    document.getElementsByClassName('init')[0].addEventListener('click', e => {
        e.target.style.display = 'none';
        run()
    })
    document.addEventListener('keydown', start);
    document.removeEventListener('keydown', start)
})

function start(e){
    // start the game with the keydown enter
    if(e.code == 'Enter'){
        document.getElementsByClassName('init')[0].style.display = 'none';
        run();
    }
}

function run(){
    // init the game and set the canvas
    canvas = document.querySelector('canvas');
    canvas.width = consts.BLOCK_SIZE * consts.BOARD_WIDTH;
    canvas.height = consts.BLOCK_SIZE * consts.BOARD_HEIGTH;

    context = canvas.getContext('2d');
    context.scale(consts.BLOCK_SIZE, consts.BLOCK_SIZE)

    setBoard()
    update()
}

function setBoard(){
    // set the board map
    for(let y=0; y < consts.BOARD_HEIGTH; y++){
        board.push([]);
        for(let i=0; i < consts.BOARD_WIDTH; i++){
            board[y].push(0);
        }
    }
}

function update(){
    // refrehs the game
    draw();
    setTimeout(update, 10)
}

function draw(){
    // set the new values for the game 
    context.fillStyle = '#0a0';
    context.fillRect(0,0, canvas.width, canvas.height);

    board.forEach( (row, y) => {
        row.forEach( (value, x) => {
            if(value == 1 || value == 2){
                context.fillStyle = '#fff';
                context.fillRect(x, y, 1, 1);
            }else if(value == 'b'){
                context.fillStyle = '#000';
                context.fillRect(x, y, 1, 1);
            }
        })
    })

    setPlayers();
    setBall();
}

function setBall(){
    // collision with top and bot
    if(ball.getY() >= consts.BOARD_HEIGTH || ball.position.y - ball.speed <= 0 )
        ball.direc.y *= -1;

    // collision with players 
    if(player1Collision() || player2Collision()){
        ball.direc.x *= -1;

        // update the ball speed depending on the collision whit players
        ball.collision_players += 1;
        if(ball.collision_players % 5 == 0){
            ball.speed += 0.05
        }
    }

    // goal
    if(ball.getX() >= consts.BOARD_WIDTH || ball.position.x - ball.speed <= 0)
        ball.getX() >= consts.BOARD_WIDTH ? goal(1) : goal(2)

    // set the direccion 
    ball.position.x += ball.direc.x * ball.speed;
    ball.position.y += ball.direc.y * ball.speed;

    context.fillStyle = '#000';
    context.fillRect(ball.position.x, ball.position.y, 1, 1)
}

function goal(type){
    // add goal to the score
    ball = new Ball(consts.BOARD_WIDTH / 2, consts.BOARD_HEIGTH / 2);
    if(type == 1){
        document.getElementById("player1").innerHTML = player_1.newScore();
        return
    }
    document.getElementById("player2").innerHTML = player_2.newScore();
}

function player1Collision(){
    // ball collision with player_1
    if(ball.getY() >= player_1.position.y  &&  ball.position.y <= player_1.position.y + player_1.shape.length && ball.position.x <= player_1.position.x + 1)
        return true
    return false
}

function player2Collision(){
    // ball collision with player_2
    if(ball.getY() >= player_2.position.y  &&  ball.position.y <= player_2.position.y + player_2.shape.length && ball.position.x >= player_2.position.x - 1)
        return true
    return false
}

function setPlayers(){
    // init the players when start the game
    player_1.shape.forEach( (row, y) => {
        row.forEach( (value, x) => {
            if(value){
                context.fillStyle = '#fff';
                context.fillRect(x + player_1.position.x, y + player_1.position.y, 1, 1)
            }
        } )
    })

    player_2.shape.forEach( (row, y) => {
        row.forEach( (value, x) => {
            if(value){
                context.fillStyle = '#fff';
                context.fillRect(x + player_2.position.x, y + player_2.position.y, 1, 1)
            }
        } )
    })
}