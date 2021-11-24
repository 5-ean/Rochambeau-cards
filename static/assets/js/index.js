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

const colorpicker = new iro.ColorPicker("#colourpicker", {
    width:90,
});
// Locates ColourPicker HexString Value
let inputColor = colorpicker.color.hexString;
// Retrieves Key: “colour” and  value : “locally Stored Hexstring”
let storedHex = (localStorage.getItem("colour", JSON.stringify(colorpicker.color.hexString)));


// Instruction Button display toggle
document.querySelector("#intructionbtn").addEventListener('click', () => 
{ document.querySelector('.collapsible').classList.toggle('collapsed');
});


// Memory() Takes LocalStorage hexstring and applies to Customizable Elements
window.onload = function memory() {
if(storedHex === null) {

    colorpicker.on();
    

} if (inputColor !== storedHex) {

    
    inputColor = storedHex

    fb.style.color = inputColor;
    tw.style.color = inputColor;
    yt.style.color = inputColor;
    insta.style.color = inputColor;
    gm.style.color = inputColor;
};

// User Interaction With ColorWheel & Slider
colorpicker.on('color:change', function(color) {
    
    fb.style.color = color.hexString;
    tw.style.color = color.hexString;
    yt.style.color = color.hexString;
    insta.style.color = color.hexString;
    gm.style.color = color.hexString;

    localStorage.setItem("colour", color.hexString);
})};



