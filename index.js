import Game from "./game/game.js";

window.addEventListener('load', () => {
    // init the game when page is loaded
    document.getElementsByClassName('init')[0].addEventListener('click', e => {
        e.target.style.display = 'none';
        new Game();
    })
    document.addEventListener('keydown', start);
    document.removeEventListener('keydown', start)
})

function start(e){
    // init the game if keyypress enter
    if(e.code == 'Enter'){
        document.getElementsByClassName('init')[0].style.display = 'none';
        new Game();
    }
}