const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        timerId: null,
        
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000)        
    }
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0){
        playSound("gmvr");
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);
        state.values.hitPosition = null;
        clearSquares();        
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.play()
}

function clearSquares(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });
}

function randomSquare(){
    
    clearSquares()

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                clearSquares()
                playSound("hit");
            } else {
                clearSquares()
                playSound("miss");
            }
            
        })      

    });
}

function init(){   
    addListenerHitBox();
}

init();