export default class Player{

    constructor(x,y,type){
        this.position = {
            x: x,
            y: y
        }
        this.shape = [
            [type],
            [type],
            [type],
            [type]
        ]
        this.score = 0;

        if(type === 1)
            document.addEventListener('keydown', e => {
                if(e.key === 'w' ){
                    if(this.position.y != 0){
                        this.position.y--;
                    }
                }else if( e.key == 's'){
                    if(this.position.y + this.shape.length <= 13){
                        this.position.y++;
                    }
                }
            })
        else if (type === 2)
            document.addEventListener('keydown', e => {
                if(e.key === 'ArrowUp' ){
                    if(this.position.y != 0){
                        this.position.y--;
                    }
                }else if( e.key === 'ArrowDown'){
                    if(this.position.y + this.shape.length <= 13){
                        this.position.y++;
                    }
                }
            })
    }

    newScore(){
        this.score++;
        return this.score;
    }
}