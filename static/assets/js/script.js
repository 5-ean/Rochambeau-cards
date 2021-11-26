class AudioController {
    constructor() {
        this.matchSound = new Audio('static/assets/audio/match.wav');
        this.loseSound = new Audio('static/assets/audio/lose.wav');
        this.winSound = new Audio('static/assets/audio/win.wav');
    }
    match() {
        this.matchSound.play();
    }
    lose() {
        this.loseSound.play();
    }
    win() {
        this.winSound.play();
    }
}

class mainGame {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.lives = document.getElementById('lives');
        this.audioController = new AudioController();
    }
    startGame() {
        this.cardToCheck = null;
        this.totalLives = 3;
        this.timeRemaining = this.totalTime;
        this.winningCards = []
        this.busy = true;
        setTimeout(() => {
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.lives.innerText = this.totalLives;
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classlist.remove('win');
        });
    }
    flipCard(card) {
        if(this.canFlipCard(card)) {
            card.classList.add('visible');

            //if statement
        }
    }
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countDown);
    }

    shuffleCards() {
        //Fisher & Yates shuffle
        for(let i = this.cardsArray.length -1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    canFlipCard(card) {
        return true;
        //return !this.busy && !this.winningCards.includes(card) && card !== this.cardToCheck;
    }
}

function ready() {
    // Creates an array from html elements viva class name.
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new mainGame(50, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}
// Once DOM is loaded, run ready function
if(document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}

// Colour Customizable DOM Elements
let fb = document.getElementById("fb");
let tw = document.getElementById("tw");
let yt = document.getElementById("yt");
let insta = document.getElementById("insta");
let gm = document.getElementById("gm");
//
var instructions = document.getElementById("instructions");
var intructionbtn = document.getElementById("intructionbtn");
/*!
 * iro.js v5.5.2
 * 2016-2021 James Daniel
 * Licensed under MPL 2.0
 * github.com/jaames/iro.js
 */
// ColourPicker Wheel & Slice Bar

var colorPicker = new iro.ColorPicker('#colourpicker', {
    width: 90,
    layout: [
      { 
        component: iro.ui.Wheel,
        options: {}
      },
    ]
  });
// Locates ColourPicker HexString Value
let inputColor = colorPicker.color.hexString;
// Retrieves Key: “colour” and  value : “locally Stored Hexstring”
let storedHex = (localStorage.getItem("colour", JSON.stringify(colorPicker.color.hexString)));


// Instruction Button display toggle
document.querySelector("#intructionbtn").addEventListener('click', () => 
{ document.querySelector('.collapsible').classList.toggle('collapsed');
});


// Memory() Takes LocalStorage hexstring and applies to Customizable Elements
window.onload = function memory() {
if(storedHex === null) {

    colorPicker.on();
    

} if (inputColor !== storedHex) {

    
    inputColor = storedHex

    fb.style.color = inputColor;
    tw.style.color = inputColor;
    yt.style.color = inputColor;
    insta.style.color = inputColor;
    gm.style.color = inputColor;
};

// User Interaction With ColorWheel & Slider
colorPicker.on('color:change', function(color) {
    
    fb.style.color = color.hexString;
    tw.style.color = color.hexString;
    yt.style.color = color.hexString;
    insta.style.color = color.hexString;
    gm.style.color = color.hexString;

    localStorage.setItem("colour", color.hexString);
})};