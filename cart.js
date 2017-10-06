'use strict';

var elTable = document.getElementById('sales-table');
// var removeBtnEl = document.getElementById('remove-button');

Product.allProducts = [];
Product.activeCart = [];
UserData.allUsers = [];

function Product(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.inCart = 0;
  Product.allProducts.push(this);
}

function UserData(name, street, city, state, zip, phone, credit) {
  this.name = name;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
  this.phone = phone;
  this.credit = credit;
  UserData.allUsers.push(this);
}

function createCell(row, data){
  var newTdEl = document.createElement('td');
  newTdEl.textContent = data;
  row.appendChild(newTdEl);
}

function generateCart(){
  Product.activeCart = JSON.parse(localStorage.getItem('activeCart'));
  console.log(Product.activeCart);
  for (var i in Product.activeCart){
    //create new row in table
    var newTrEl = document.createElement('tr');
    newTrEl.setAttribute('id', Product.activeCart[i].name);
    //create name cell
    createCell(newTrEl, Product.activeCart[i].name);
    //create picture cell
    var newTdEl = document.createElement('td');
    var newImgEl = document.createElement('img');
    newImgEl.src = Product.activeCart[i].filePath;
    newTdEl.appendChild(newImgEl);
    newTrEl.appendChild(newTdEl);
    //create quantity cell
    createCell(newTrEl, Product.activeCart[i].inCart);
    //create cell with remove button
    newTdEl = document.createElement('td');
    var newBtnEl = document.createElement('button');
    newBtnEl.setAttribute('type', 'click');
    newBtnEl.setAttribute('name', Product.activeCart[i].name);
    newBtnEl.textContent = 'Remove';
    newTdEl.appendChild(newBtnEl);
    newTrEl.appendChild(newTdEl);
    newBtnEl.addEventListener('click', removeFromCart);
    //add row to table
    elTable.appendChild(newTrEl);
    // var tempEl = document.getElementById(Product.activeCart[i].name);
    // console.log(tempEl);
    // tempEl.addEventListener('click', removeFromCart);
  }
}

function removeFromCart(event){
  var temp = event.target.name;
  for (var i in Product.activeCart){
    if (Product.activeCart[i].name === temp){
      Product.activeCart.splice(i, 1);
      console.log(Product.activeCart);
      localStorage.setItem('activeCart', JSON.stringify(Product.activeCart));
      console.log(localStorage.activeCart);
      break;
    }
  }
  location.reload();
}

if (localStorage.getItem('activeCart') !== null) {
  console.log('Data found');
  Product.activeCart = JSON.parse(localStorage.getItem('activeCart'));
} else {
  console.log('Not found');
  alert('Your cart is empty! Please select an item to purchase.');
}

// removeBtnEl.addEventListener('click', removeFromCart);

generateCart();
