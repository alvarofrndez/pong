export default class Ball{
    constructor(x,y){
        this.position = {
            x: x,
            y: y
        }
        this.shape = 'b';
        this.speed = 0.1;
        this.collision_players = 0;
        this.direc = {
            x: Math.random() <= 0.5 ? -1 : 1,
            y: Math.random() <= 0.5 ? -1 : 1
        }
    }

    getY(){
        return (this.position.y + this.shape.length + this.speed)
    }

    getX(){
        return (this.position.x + this.shape.length + this.speed)
    }
}