import Game from "./game/game.js";

window.addEventListener('load', () => {
    playAudio();

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

function playAudio(){
    let playing_audio = false

    let audio = new Audio('music.mp3');
    audio.volume = 0.05;

    let play_audio = document.getElementById('audio');
    play_audio.addEventListener('click', () => {
        playing_audio = !playing_audio;
        if(playing_audio){
            audio.play();
            play_audio.innerHTML = 'Pausar audio';
        }else{
            audio.pause();
            play_audio.innerHTML = 'Iniciar audio';
        }
    })

    let reset_audio = document.getElementById('reset');
    reset_audio.addEventListener('click', () => {
        audio.pause();
        audio = new Audio('music.mp3')
        audio.volume = 0.05;
        audio.play();
        play_audio.innerHTML = 'Pausar audio';
    })
}