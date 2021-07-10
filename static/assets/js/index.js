// Colour Customizable DOM Elements
let cup1 = document.getElementById("cup1");
let cup2 = document.getElementById("cup2");
let cup3 = document.getElementById("cup3");
let fb = document.getElementById("fb");
let tw = document.getElementById("tw");
let yt = document.getElementById("yt");
let insta = document.getElementById("insta");
let gm = document.getElementById("gm");
let contact = document.getElementById("contact");
// ColourPicker Wheel & Slice Bar
const colorpicker = new iro.ColorPicker("#colourpicker", {
    width:90,
});
// Locates ColourPicker HexString Value
let inputColor = colorpicker.color.hexString;
// Retrieves Key: “colour” and  value : “locally Stored Hexstring”
let storedHex = (localStorage.getItem("colour", JSON.stringify(colorpicker.color.hexString)));

// Memory() Takes LocalStorage hexstring and applies to Customizable Elements
window.onload = function memory() {
if(inputColor === "#ffffff") {

    inputColor = storedHex;

    cup1.style.borderBottomColor = inputColor;
    cup2.style.borderBottomColor = inputColor;
    cup3.style.borderBottomColor = inputColor;
    fb.style.color = inputColor;
    tw.style.color = inputColor;
    yt.style.color = inputColor;
    insta.style.color = inputColor;
    gm.style.color = inputColor;
    contact.style.color = inputColor;
    
} else {
    colorpicker.on();
};

// User Interaction With ColorWheel & Slider
colorpicker.on('color:change', function(color) {
    

    cup1.style.borderBottomColor = color.hexString;
    cup2.style.borderBottomColor = color.hexString;
    cup3.style.borderBottomColor = color.hexString;
    fb.style.color = color.hexString;
    tw.style.color = color.hexString;
    yt.style.color = color.hexString;
    insta.style.color = color.hexString;
    gm.style.color = color.hexString;
    contact.style.color = color.hexString;

    localStorage.setItem("colour", color.hexString);
   
});



// How To Play Instructions Displayer
var instructions = document.getElementById("instructions");
var intructionbtn = document.getElementById("intructionbtn");


intructionbtn.onclick = function(){

    if(instructions.className == "close") {
        //Opens The Instructions
        instructions.className = ""
        intructionbtn.innerHTML = "I Got It!";
    } else {
        //Closes The Tnstructions
        instructions.className = "close";
        intructionbtn.innerHTML = "Instructions";
    }
}};