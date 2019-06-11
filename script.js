const form = document.querySelector('form');
const ul = document.querySelector('ul');
const input = document.getElementById('item');
const btn_submit = document.getElementById('submit');
const btn_clear = document.getElementById('clear');

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

const liMaker = (text) => {
  const li = document.createElement('li');
  li.textContent = text;
  ul.appendChild(li);
}

data.forEach(item => {
  liMaker(item);
});

function submitNewEntry(){
  if (input.value === "" || input.value[0] === " ") {
    input.value = "";
    return;
  }
  itemsArray.push(input.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  liMaker(input.value);
  input.value = "";
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  submitNewEntry();
});

btn_submit.addEventListener('click', function(){
  submitNewEntry();
});

btn_clear.addEventListener('click', function () {
  localStorage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  itemsArray = [];
});
