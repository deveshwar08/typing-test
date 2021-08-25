let s = 0;
let m = 0;
let h = 0;
let testStarted = false;
let testEnded = true;
let t1;
let t2;
let currentAccuracy = 0;
let currentSpeed = 0;
let charactersCorrect = 0;
let difficulty = 'Easy';
function resetValues() {
    testEnded = true;
    testStarted = false;
    currentAccuracy = 0;
    currentSpeed = 0;
    charactersCorrect = 0;
    s = 0;
    m = 0;
    h = 0;
    document.getElementById('result').innerText = '';
    document.getElementById('paragraph').innerHTML = '';
    getPara();
    drawChart();
    document.getElementById('input-area').value = '';
    document.getElementById('timer').innerText = '';
    clearTimeout(t1);
    clearTimeout(t2);
}
function toggleDifficulty(){
    let difficultyOptions = document.querySelectorAll('input[name="difficulty"]');
    for (let difficultyOption of difficultyOptions) {
        if (difficultyOption.checked) {
            difficulty = difficultyOption.value;
            console.log(difficulty);
            resetValues();
            break;
        }
    }
}
function timer() {
    if (!testEnded) {
        s++;
        if (s >= 60) {
            s -= 60;
            m++;
        }
        if (m >= 60) {
            m -= 60;
            h++;
        }
        document.getElementById('timer').innerText = h + ":" + m + ":" + s;
    }
    t = setTimeout(timer, 1000);
}
function accuracySpeed(){
    if(!testEnded){
        let charTyped = inputElement.value.split('').length;
        currentSpeed = charTyped / (h*60*60+m*60+s);
        currentAccuracy = charactersCorrect/charTyped * 100;
        drawChart();
    }
    t2 = setTimeout(accuracySpeed,100);
}

function getPara() {
    var xmlHttp = new XMLHttpRequest();
    if(difficulty == 'Easy')
        xmlHttp.open("GET", 'http://metaphorpsum.com/paragraphs/1/10', false);
    else
        xmlHttp.open("GET","http://metaphorpsum.com/paragraphs/1/20", false);
    xmlHttp.send(null);
    let para = xmlHttp.responseText;
    para.split('').forEach(ch => {
        let span = document.createElement('span');
        span.innerText = ch;
        document.getElementById('paragraph').appendChild(span);
    });
}

const inputElement = document.getElementById('input-area');

function currentInput() {
    let currentInput = inputElement.value;
    let currentInputArr = currentInput.split('');
    let charactersTyped = currentInputArr.length;
    let paraArr = document.getElementsByTagName('span');
    charactersCorrect = 0;
    [...paraArr].forEach((ch, i) => {
        if (currentInputArr[i] == null) {
            ch.classList.remove('red');
            ch.classList.remove('green');
        } else if (ch.innerText == currentInputArr[i]) {
            charactersCorrect++;
            ch.classList.remove('red');
            ch.classList.add('green');
        } else {
            ch.classList.remove('green');
            ch.classList.add('red');
        }
    });
    if (charactersTyped == [...paraArr].length) {
        testEnded = true;
        let time = h * 60 * 60 + m * 60 + s;
        let speed = [...paraArr].length / time;
        gameOver(speed);
    }
}
function startTest() {
    if (!testStarted) {
        testEnded = false;
        accuracySpeed();
        timer();
        testStarted = true;
    }
}
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Accuracy', currentAccuracy],
        ['Speed', currentSpeed]
    ]);

    var options = {
        width: 600, height: 200,
        greenFrom: 90, greenTo: 100,
        yellowFrom: 75, yellowTo: 90,
        minorTicks: 5
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart-div'));
    chart.draw(data, options);
}
function gameOver(speed) {
    document.getElementById('result').innerText = "Your speed: " + speed + " char/s";
    let highSpeed = localStorage.getItem('Speed');
    if (speed > highSpeed)
        localStorage.setItem('Speed', speed);
    displayHighScore();
}
function displayHighScore() {
    if (localStorage.getItem('Speed')) {
        let highSpeed = localStorage.getItem('Speed');
        document.getElementById('high-speed').innerText = "Your highest speed: " + highSpeed + " char/s";
    }
}
getPara();
displayHighScore();
google.charts.load('current', { packages: ['gauge'] });
google.charts.setOnLoadCallback(drawChart);