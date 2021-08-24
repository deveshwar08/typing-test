var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET",'http://metaphorpsum.com/paragraphs/2/4', false);
xmlHttp.send(null);
let para = xmlHttp.responseText;

document.getElementById('paragraph').innerHTML = para;

const inputElement = document.getElementById('input-area');

function currentInput() {
    let currentInput = inputElement.value;
    let currentInputArr = currentInput.split('');
    let charctersTyped = currentInputArr.length;
    let paraArr = para.split('');
    let charactersCorrect = 0;
    paraArr.forEach((ch, i) => {
        if(ch == currentInputArr[i])
            charactersCorrect++;
        else
            break;
    });
    if(charctersTyped != charactersCorrect)
        console.log("You typed wrong");
    else
        console.log("You typed correct");
    console.log(currentInput);
}