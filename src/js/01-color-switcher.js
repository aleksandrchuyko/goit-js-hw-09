const   startBtnRef = document.querySelector('button[data-start]'),
        stopBtnRef = document.querySelector('button[data-stop]'),
        backgroundRef = document.querySelector('body');

let timer;

stopBtnRef.setAttribute('disabled', "");

function setBackgroundColor() {
    backgroundRef.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtnRef.addEventListener('click', (e) => {
    setBackgroundColor();
    timer = setInterval(setBackgroundColor, 1000);
    e.target.setAttribute('disabled', "");
    stopBtnRef.removeAttribute('disabled');
})

stopBtnRef.addEventListener('click', (e) => {
    clearInterval(timer);
    e.target.setAttribute('disabled', "");
    startBtnRef.removeAttribute('disabled');
})
