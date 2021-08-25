let s = 0;
let m = 0;
let h = 0;
let testStarted = false;
let testEnded = false;
function resetValues(){
    testEnded = false;
    testStarted = false;
    s = 0;
    m = 0;
    h = 0;
    document.getElementById('result').innerText = '';
    document.getElementById('paragraph').innerHTML = '';
    getPara();
    document.getElementById('input-area').value = '';
}
function timer(){
    if(!testEnded){
        s++;
        if(s >= 60){
            s -= 60;
            m++;
        }
        if(m >= 60){
            m -=60;
            h++;
        }
        document.getElementById('timer').innerText = h+":"+m+":"+s;
    }
    setTimeout(timer,1000);
}

function getPara() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://metaphorpsum.com/paragraphs/1/10', false);
    xmlHttp.send(null);
    let para = xmlHttp.responseText;
    para.split('').forEach(ch =>{
        let span = document.createElement('span');
        span.innerText = ch;
        document.getElementById('paragraph').appendChild(span);
    });
}

const inputElement = document.getElementById('input-area');

function currentInput() {
    let currentInput = inputElement.value;
    let currentInputArr = currentInput.split('');
    let paraArr = document.getElementsByTagName('span');
    let charactersCorrect = 0;
    [...paraArr].forEach((ch, i) => {
        if(currentInputArr[i] == null){
            ch.classList.remove('red');
            ch.classList.remove('green');
        }else if (ch.innerText == currentInputArr[i]) {
            charactersCorrect++;
            ch.classList.remove('red');
            ch.classList.add('green');
        } else {
            ch.classList.remove('green');
            ch.classList.add('red');
        }
    });
    if(charactersCorrect == [...paraArr].length){
        testEnded = true;
        let time = h*60*60 + m*60 + s;
        let speed = [...paraArr].length / time;
        gameOver(speed);
    }
}
function startTest(){
    if(!testStarted){
        timer();
        testStarted  =true;
    }
}
function gameOver(speed){
    document.getElementById('result').innerText = "Your speed: "+speed+" char/s";
}
getPara();