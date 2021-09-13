const hamburger = document.getElementById("hamburger");
hamburger.addEventListener("click", inAnOut);

function inAnOut(){
    const menuBox = document.getElementById("menuBox");
    // menuBox.classList.toggle(".show");
    if(menuBox.style.transform == 'translate(-100%)'){
        menuBox.style.transform = 'translate(0%)';
        menuBox.style.transition = '.2s ease-in'; 
    } 
    else{
        menuBox.style.transform = 'translate(-100%)';
        menuBox.style.transition = '.2 ease-out';
    }
}








