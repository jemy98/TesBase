document.getElementById("colorInput").addEventListener("input", function(event){
    let selectedColor = event.target.value

    document.getElementById("colorCode").textContent = selectedColor

    document.getElementById("colorDisplay").style.backgroundColor = selectedColor


})