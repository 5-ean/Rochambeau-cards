// Colour picker JavaScript
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