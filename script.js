const form = document.querySelector('form');
const input = document.getElementById('item');
const btn_del_submit = document.getElementById('submit');
const btn_del_clear = document.getElementById('clear');
const tbl = document.querySelector('table');

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const allItems = JSON.parse(localStorage.getItem('items'));

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
    for (let i = 0; i < tbl.rows.length; i++) {
      if (tbl.rows[i] === tr) {
        itemsArray.splice(i,1);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        tbl.removeChild(tr);
      }
    }
  };
  btn_update.onclick = function(){
    if (input.value === "" || input.value[0] === " ") {
      input.value = "";
      return;
    }
    for (let i = 0; i < tbl.rows.length; i++) {
      if (tbl.rows[i] === tr) {
        itemsArray[i] = input.value;
        td.childNodes[0].data = input.value;
        localStorage.setItem('items', JSON.stringify(itemsArray));
      }
    }
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
