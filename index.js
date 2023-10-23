import Game from "./game/game.js";

window.addEventListener('load', () => {
    // init the game when page is loaded
    for(let b of document.getElementsByClassName('init')){
        b.addEventListener('click', e => {
            e.target.style.display = 'none';
            document.getElementsByClassName('winner')[0].style.display = 'none';
            new Game();
        })
    }

    document.getElementsByClassName('winner')[0].style.display = 'none'
    document.addEventListener('keydown', e => start(e));
    document.removeEventListener('keydown', start)
})

function start(e){
    // init the game if keypress enter
    if(e.code == 'Enter'){
        document.getElementsByClassName('init')[0].style.display = 'none';
        document.getElementsByClassName('winner')[0].style.display = 'none';
        new Game();
    }
}