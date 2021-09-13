// navbar behaviour
function navbar(){
    const navButton = document.getElementsByTagName('.navbar button:nth-of-type(1)'); 
    navButton.addEventlistner('click', navbar); 

    if(menuBox.style.display == "block") { // if is menuBox displayed, hide it
        menuBox.style.display = "none";
      }
      else { // if is menuBox hidden, display it
        menuBox.style.display = "block";
    }
}


