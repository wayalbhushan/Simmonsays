let gameSeq = [];
let userSeq = [];

let buttons = ["pink", "green", "orange", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start the game
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 150);
}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = buttons[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
  
}


function btnPress() {
    let btn = this;
    let userColor = btn.classList[1];
    userSeq.push(userColor);
    btnFlash(btn);
 
    checkAnswer(userSeq.length - 1);
}

function checkAnswer(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerText = `Game Over! Press any key to restart`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 200);
        resetGame();
    }
}

function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// Add click listeners to buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
