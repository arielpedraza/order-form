'use strict';



var elTable = document.getElementById('sales-table');

Product.allProducts = [];
Product.activeCart = [];
UserData.allUsers = [];

if (localStorage.getItem('activeCart') !== null) {
  console.log('Data found');
  Product.activeCart = JSON.parse(localStorage.getItem('activeCart'));
} else {
  console.log('Not found');
  alert('Your cart is empty! Please select an item to purchase.');
};

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
  var newTrEl = document.createElement('tr');
  createCell(newTrEl, 'dummy data');
  createCell(newTrEl, 'dummy data');
  createCell(newTrEl, 'dummy data');
  elTable.appendChild(newTrEl);
  newTrEl = document.createElement('tr');
  createCell(newTrEl, 'dummy data');
  createCell(newTrEl, 'dummy data');
  createCell(newTrEl, 'dummy data');
  elTable.appendChild(newTrEl);
}
generateCart();
