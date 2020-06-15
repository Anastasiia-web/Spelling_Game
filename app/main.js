const level1 = document.querySelector('#first-level');
const level2 = document.querySelector('#second-level');
const level3 = document.querySelector('#third-level');
const userInput = document.querySelector('#user-input');
const userScore = document.querySelector('#score');
const GivenWordForSpelling = document.querySelector('#word-for-spelling'); 

let NewWord = '';
let points = 0;

const words = [];
const intervals = [];

function loadDefaultData() {                           // AJAX ассинхронный JS и XML

    const aja = new XMLHttpRequest();                  //создаем объект AJAX
    aja.onload = () => {
        const data = JSON.parse(aja.responseText);
        console.log(data);
        words.push(...data);
    }        
    aja.open('GET', './data/data.json');               //указываем куда и как мы делаем запрос
    aja.send();
}


function getWord(){

function randWord(min = 0, max = 50) {
    
    const rN = Math.floor(Math.random() * (max - min + 1) + min);
    const fin = rN + 1;

    NewWord = words.slice(rN, fin).join('')
    GivenWordForSpelling.innerHTML = `${NewWord}`;
}
    randWord();
}


function count() { 

    const userInputValue = userInput.value;
   
    if(userInputValue == NewWord) {
        result.innerHTML = 'Well done!';
        userInput.value = '';       
            points += 1;
            userScore.innerHTML = `Score: ${points} <i class="fas fa-beer"></i>`;
    } else {
        function red(){
            userInput.style.color = 'red';
        }
        function black(){
            userInput.style.color = 'black';
        }
        setTimeout( red);
        setTimeout( black, 3000 );
        result.innerHTML = 'Oops, try again!';
        userScore.innerHTML = `Score: ${points}`;
    }  
}


function hide() {
    GivenWordForSpelling.style.color = `transparent`;
}


function show() {
    GivenWordForSpelling.style.color = `green`;
}


function clearIntervals() {
    intervals.forEach(el => clearInterval(el));
}


function firstLevel() {

    level1.style.color = 'black';
    level2.style.color = 'white';
    level3.style.color = 'white';

    clearIntervals();

    getWord();

    document.querySelector('#start').addEventListener('click', getWord);

    document.querySelector('#user-input').addEventListener('change', count);

}

    document.querySelector('#first-level').addEventListener('click', firstLevel);


function SecondLevel() {

   level2.style.color = 'black';
   level1.style.color = 'white';
   level3.style.color = 'white';

   clearIntervals();

    getWord();

    intervals.push(setInterval( hide, 5000 ));

    document.querySelector('#start').addEventListener('click', show);

    document.querySelector('#start').addEventListener('click', getWord);

    intervals.push(setInterval( hide, 5000 ));

    document.querySelector('#user-input').addEventListener('change', count);

}

document.querySelector('#second-level').addEventListener('click', SecondLevel);


function thirdLevel() {

    level1.style.color = 'white';
    level2.style.color = 'white';
    level3.style.color = 'black';

    clearIntervals();

    getWord();

    document.querySelector('#start').addEventListener('click', getWord);

    intervals.push(setInterval( getWord, 5000 ));

    document.querySelector('#user-input').addEventListener('change', count);

}

    document.querySelector('#third-level').addEventListener('click', thirdLevel);


//загрузка данных из файла  // JSON только двойные кавычки везде
loadDefaultData();
