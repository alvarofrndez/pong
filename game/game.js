import Ball from "../ball/ball.js";
import Player from "../player/player.js";
import * as cons from "../constants/constants.js";

export default class Game{
    constructor(){
        this.players = [
            new Player(1, cons.PLAYERS_Y / 2 ,1),
            new Player(cons.BOARD_WIDTH - 2, cons.PLAYERS_Y / 2 ,2)
        ]
        this.ball = new Ball(cons.BOARD_WIDTH / 2, cons.BOARD_HEIGTH / 2)
        this.board = [];
        this.canvas = document.querySelector('canvas');
       
        this.setCanvas()
        this.setBoard()
        this.update()
    }

    draw(){
        this.context.fillStyle = '#0a0';
        this.context.fillRect(0,0, this.canvas.width, this.canvas.height);

        this.board.forEach( (row, y) => {
            row.forEach( (value, x) => {
                if(value == 1 || value == 2){
                    this.context.fillStyle = '#fff';
                    this.context.fillRect(x, y, 1, 1);
                }else if(value == 'b'){
                    this.context.fillStyle = '#000';
                    this.context.fillRect(x, y, 1, 1);
                }
            })
        })

        this.setPlayers();
        this.setBall();
    }

    update(){
        // refrehs the game
        this.draw();
        setTimeout(() => this.update(), 10)
    }

    setCanvas(){
        // set the canvas
        this.canvas.width = cons.BLOCK_SIZE * cons.BOARD_WIDTH;
        this.canvas.height = cons.BLOCK_SIZE * cons.BOARD_HEIGTH;

        this.context = this.canvas.getContext('2d');
        this.context.scale(cons.BLOCK_SIZE, cons.BLOCK_SIZE)
    }

    setBoard(){
        // set the board map
        for(let y=0; y < cons.BOARD_HEIGTH; y++){
            this.board.push([]);
            for(let i=0; i < cons.BOARD_WIDTH; i++){
                this.board[y].push(0);
            }
        }
    }

    setBall(){
        // collision with top and bot
        if(this.ball.getY() >= cons.BOARD_HEIGTH || this.ball.position.y - this.ball.speed <= 0 )
        this.ball.direc.y *= -1;

        // collision with players 
        if(this.player1Collision() || this.player2Collision()){
            this.ball.direc.x *= -1;

            // update the ball speed depending on the collision whit players
            this.ball.collision_players += 1;
            if(this.ball.collision_players % 5 == 0){
                this.ball.speed += 0.05
            }
        }

        // goal
        if(this.ball.getX() >= cons.BOARD_WIDTH || this.ball.position.x - this.ball.speed <= 0)
            this.ball.getX() >= cons.BOARD_WIDTH ? this.goal(1) : this.goal(2)

        // set the direccion 
        this.ball.position.x += this.ball.direc.x * this.ball.speed;
        this.ball.position.y += this.ball.direc.y * this.ball.speed;

        this.context.fillStyle = '#000';
        this.context.fillRect(this.ball.position.x, this.ball.position.y, 1, 1)
    }

    player1Collision(){
        // ball collision with player1
        if(this.ball.getY() >= this.players[0].position.y  &&  this.ball.position.y <= this.players[0].position.y + this.players[0].shape.length && this.ball.position.x <= this.players[0].position.x + 1)
            return true
        return false
    }
    
    player2Collision(){
        // ball collision with player2
        if(this.ball.getY() >= this.players[1].position.y  &&  this.ball.position.y <= this.players[1].position.y + this.players[1].shape.length && this.ball.position.x >= this.players[1].position.x - 1)
            return true
        return false
    }

    setPlayers(){
        // init the players when start the game
        for(let player of this.players){
            player.shape.forEach( (row, y) => {
                row.forEach( (value, x) => {
                    if(value){
                        this.context.fillStyle = '#fff';
                        this.context.fillRect(x + player.position.x, y + player.position.y, 1, 1)
                    }
                } )
            })
        }
    }

    goal(type){
        // add goal to the score
        this.ball = new Ball(cons.BOARD_WIDTH / 2, cons.BOARD_HEIGTH / 2);
        if(type == 1){
            document.getElementById("player1").innerHTML = this.players[0].newScore();
            return
        }
        document.getElementById("player2").innerHTML = this.players[1].newScore();
    }
}