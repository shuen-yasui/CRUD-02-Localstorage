const form = document.querySelector('form');
const input = document.getElementById('item');
const btn_del_submit = document.getElementById('submit');
const btn_del_clear = document.getElementById('clear');
const tbl = document.querySelector('table');

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const allItems = JSON.parse(localStorage.getItem('items'));

console.log(itemsArray);
console.log(allItems);

const liMaker = (text) => {
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  const btn_del = document.createElement('button');
  const btn_update = document.createElement('button');
  tr.appendChild(td);
  td.appendChild(document.createTextNode(text));
  btn_del.innerHTML = "delete";
  btn_update.innerHTML = "update";
  btn_del.onclick = function(){
    tbl.removeChild(tr);
  };
  btn_update.onclick = function(){
    console.log(localStorage);
    let i = localStorage.getItem('items');
    console.log(i);
    td.childNodes[0].data = "fasdfsd";
  }
  td.appendChild(btn_del);
  td.appendChild(btn_update);
  tbl.appendChild(tr);
}

allItems.forEach(item => {
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

btn_del_submit.addEventListener('click', function(){
  submitNewEntry();
});

btn_del_clear.addEventListener('click', function () {
  localStorage.clear();
  while (tbl.firstChild) {
    tbl.removeChild(tbl.firstChild);
  }
  itemsArray = [];
});
