var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET",'http://metaphorpsum.com/paragraphs/2/4', false);
xmlHttp.send(null);
let para = xmlHttp.responseText;

document.getElementById('paragraph').innerHTML = para;