'use strict';

var imageLibrary = [
  ['bag', 'img/bag.jpg'],
  ['banana', 'img/banana.jpg'],
  ['bathroom', 'img/bathroom.jpg'],
  ['boots', 'img/boots.jpg'],
  ['breakfast', 'img/breakfast.jpg'],
  ['bubblegum', 'img/bubblegum.jpg'],
  ['chair', 'img/chair.jpg'],
  ['cthulhu', 'img/cthulhu.jpg'],
  ['dog-duck', 'img/dog-duck.jpg'],
  ['dragon', 'img/dragon.jpg'],
  ['pen', 'img/pen.jpg'],
  ['pet-sweep', 'img/pet-sweep.jpg'],
  ['scissors', 'img/scissors.jpg'],
  ['shark', 'img/shark.jpg'],
  ['sweep', 'img/sweep.png'],
  ['tauntaun', 'img/tauntaun.jpg'],
  ['unicorn', 'img/unicorn.jpg'],
  ['usb', 'img/usb.gif'],
  ['water-can', 'img/water-can.jpg'],
  ['wine-glass', 'img/wine-glass.jpg']
];

var elTable = document.getElementById('sales-table');
var addCartBtnEl = document.getElementById('store-form');
var userBtnEl = document.getElementById('user-form');
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

function cartHandler(event) {
  event.preventDefault();
  console.log('eventHandler called');
  //save cart item
  var item = event.target.id.value;
  var qty = event.target.quantity.value;
  for (var i in Product.allProducts){
    if (item === Product.allProducts[i].name){
      Product.allProducts[i].inCart += qty;
      break;
    }
  }
  //save user data
  //save to local storage
  localStorage.setItem('allProducts', JSON.stringify(Product.allProducts));
  console.log(localStorage.allProducts);
  //clear form
}

function purchaseHandler(event) {
  event.preventDefault();
  var name = event.target.name.value;
  var street = event.target.street.value;
  var city = event.target.city.value;
  var state = event.target.state.value;
  var zip = event.target.zip.value;
  var phone = event.target.phone.value;
  var credit = event.target.credit.value;
  new UserData(name, street, city, state, zip, phone, credit);
  console.log(localStorage.allUsers);
  for (var i in Product.allProducts){
    if (Product.allProducts[i].inCart > 0){
      Product.activeCart.push(Product.allProducts[i]);
    }
  }
  localStorage.setItem('allUsers', JSON.stringify(UserData.allUsers));
  localStorage.setItem('activeCart', JSON.stringify(Product.activeCart));

}

function createCell(row, data){
  var newTdEl = document.createElement('td');
  newTdEl.textContent = data;
  row.appendChild(newTdEl);
}

function initialize() {
  for (var i in imageLibrary){
    new Product(imageLibrary[i][0], imageLibrary[i][1]);
  }
}
console.log('event lister enabled');
initialize();
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
addCartBtnEl.addEventListener('submit', cartHandler);
userBtnEl.addEventListener('submit', purchaseHandler);
