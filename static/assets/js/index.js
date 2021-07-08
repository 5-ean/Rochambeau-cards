
// Colour Picker JavaScript
let cup1 = document.getElementById("cup1");
let cup2 = document.getElementById("cup2");
let cup3 = document.getElementById("cup3");
const colorpicker = new iro.ColorPicker("#colourpicker", {
    width:90, color: "#fff"
});
colorpicker.on('color:change', function(color) {
    cup1.style.borderBottomColor = color.hexString;
    cup2.style.borderBottomColor = color.hexString;
    cup3.style.borderBottomColor = color.hexString;
});

// How To Play Instructions Displayer
var instructions = document.getElementById("instructions");
var intructionbtn = document.getElementById("intructionbtn");

intructionbtn.onclick = function(){

    if(instructions.className == "close") {
        //open the instructions
        instructions.className = ""
        intructionbtn.innerHTML = "I Got It!";
    } else {
        // close the instructions
        instructions.className = "close";
        intructionbtn.innerHTML = "How To Play";
    }

};
