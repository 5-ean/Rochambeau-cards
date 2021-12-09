class AudioController {
    // Setting audio sounds for card states.
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

const CARDVALUES = [
    // Use to determine win and loses for cardResults e.g Rock beats scissors.
    {
        name: 'rock',
        beats: 'scissors'
    },
    {
        name: 'paper',
        beats: 'rock'
    },
    {
        name: 'scissors',
        beats: 'paper'
    }
]


class mainGame {
    // Game Set up on DOM load complete.
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.lives = document.getElementById('lives');
        this.audioController = new AudioController();
    }
    startGame() {
        // Conditions set on click to start/restart.
        this.cardToCheck = null;
        this.totalLives = 5;
        this.timeRemaining = this.totalTime;
        this.matchedCards = []
        this.winningCards = []
        this.beatenCards = []
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
        // Returns cards to default position.
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('win');
            card.classList.remove('lose');
        });
    }
    flipCard(card) {
        // Flips card if canFlipCard is true.
        if(this.canFlipCard(card)) {
            // Card is flipped.
            card.classList.add('visible');
            // Checks if cards match.
            if(this.cardToCheck)
                this.checkForCardMatch(card);
            else
                this.cardToCheck = card;
        }
    }
    checkForCardMatch(card) {
        // If card types match: runs match function, else run results function.
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardResult(card, this.cardToCheck);

        this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
        // When Cards Match they are turned back around.
        this.busy = true;
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        setTimeout(() => {
            card1.classList.remove('visible', 'win', 'lose');
            card2.classList.remove('visible', 'win', 'lose');
            this.audioController.match();
            this.busy = false;
            // Win check, used to guard against last two cards being the same value. If true and winningCards [] > beatenCards [] = victory.
            if((this.winningCards.length >= this.beatenCards.length) && (this.winningCards.length + this.beatenCards.length >= 10))
                this.victory();
        }, 1000);
    }
    cardWin(card1, card2) {
        // Function for collecting and displaying winning cards.
        this.matchedCards.pop(card1);
        this.matchedCards.pop(card2);
        this.winningCards.push(card1);
        this.winningCards.push(card2);
        card1.classList.add('win');
        card2.classList.add('win');
        this.audioController.win();
        // Win check, if winning array is greater or equal to total cards (12) - array of beaten cards = victory.
        if(this.winningCards.length >= (this.cardsArray.length - this.beatenCards.length))
            this.victory();
    }
    cardLose(card1, card2) {
        // Function for collecting and displaying lossing cards.
        this.matchedCards.pop(card1);
        this.matchedCards.pop(card2);
        this.beatenCards.push(card1);
        this.beatenCards.push(card2);
        card1.classList.add('lose');
        card2.classList.add('lose');
        this.audioController.lose();
        // One live lost for ever incorrect card selections.
        this.totalLives--;
        this.lives.innerText = this.totalLives;
        // Lose check, if total beaten cards is greater than winning cards & all possible cards have been selected OR lives reach 0 = Game Over.
        if(((this.beatenCards.length >= this.winningCards.length) && (this.winningCards.length + this.beatenCards.length >= 10)) || this.totalLives == 0)
            this.gameOver();
    }
    cardResult(card1, card2) {
        // Function takes first picked cards name and compares to the second cards key value pair beats.
        const firstValue = this.getCardType(card1)
        const firstSelection = CARDVALUES.find(selection => selection.name === firstValue)
        const secondValue = this.getCardType(card2)
        const secondSelection = CARDVALUES.find(selection => selection.name === secondValue)
        if (firstSelection.name === secondSelection.beats) {
            this.cardWin(card1, card2);
        }
        else
            this.cardLose(card1, card2);
    } 
    getCardType(card) {
        // Returns .scissors, .rock or .paper as cardType
        return card.getElementsByClassName('card-value')[0].classList[2];
    }
    startCountDown() {
        // Timer function counts down from 50 seconds.
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }
    gameOver() {
        // Game-over overlay.
        clearInterval(this.countDown);
        document.getElementById('game-over-text').classList.add('visible');
    }
    victory() {
        // Victory overlay. 
        clearInterval(this.countDown);
        document.getElementById('win-text').classList.add('visible');
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
        // Setting conditions for a can that CAN be flipped. All false returns true.
        return !this.busy && !this.beatenCards.includes(card) && !this.winningCards.includes(card) && card !== this.cardToCheck;
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
let clock = document.querySelector('#clock');
let heart = document.querySelector('#heart');
// Interactive Buttons elements
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
    width: 65,
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
    clock.style.color = inputColor;
    heart.style.color = inputColor;
};

// User Interaction With ColorWheel & Slider
colorPicker.on('color:change', function(color) {
    
    fb.style.color = color.hexString;
    tw.style.color = color.hexString;
    yt.style.color = color.hexString;
    insta.style.color = color.hexString;
    gm.style.color = color.hexString;
    clock.style.color = color.hexString;
    heart.style.color = color.hexString;

    localStorage.setItem("colour", color.hexString);
})};