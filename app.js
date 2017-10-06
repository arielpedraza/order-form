'use strict';

var imageLibrary = [
  ['Luggage', 'img/bag.jpg'],
  ['Banana Slicer', 'img/banana.jpg'],
  ['Bathroom Buddy', 'img/bathroom.jpg'],
  ['Fashion Wellies', 'img/boots.jpg'],
  ['Breakfast Machine', 'img/breakfast.jpg'],
  ['Meatball Bubblegum', 'img/bubblegum.jpg'],
  ['Chair', 'img/chair.jpg'],
  ['Cthulhu', 'img/cthulhu.jpg'],
  ['Duck Muzzle', 'img/dog-duck.jpg'],
  ['Dragon Meat', 'img/dragon.jpg'],
  ['Practical Cutlery', 'img/pen.jpg'],
  ['Pet Broom', 'img/pet-sweep.jpg'],
  ['Pizza Scissors', 'img/scissors.jpg'],
  ['Shark Blanket', 'img/shark.jpg'],
  ['Baby Broom', 'img/sweep.png'],
  ['Tauntaun', 'img/tauntaun.jpg'],
  ['Unicorn Meat', 'img/unicorn.jpg'],
  ['Tentacle USB', 'img/usb.gif'],
  ['Watering Can', 'img/water-can.jpg'],
  ['Wine Glass', 'img/wine-glass.jpg']
];

var addCartBtnEl = document.getElementById('store-form');
var userBtnEl = document.getElementById('user-form');
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

function cartHandler(event) {
  event.preventDefault();
  console.log('eventHandler called');
  //save cart item
  var item = event.target.items.value;
  console.log(item);
  var qty = parseInt(event.target.quantity.value);
  console.log(event.target);
  for (var i in Product.allProducts){
    if (item === Product.allProducts[i].name){
      Product.allProducts[i].inCart += qty;
      console.log(Product.allProducts[i].inCart);
      break;
    }
  }
  //save user data
  //save to local storage
  // localStorage.setItem('allProducts', JSON.stringify(Product.allProducts));
  // console.log(localStorage.allProducts);
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
  for (var i in Product.allProducts){
    if (Product.allProducts[i].inCart > 0){
      Product.activeCart.push(Product.allProducts[i]);
      console.log(Product.activeCart);
    }
  }
  localStorage.setItem('allUsers', JSON.stringify(UserData.allUsers));
  localStorage.setItem('activeCart', JSON.stringify(Product.activeCart));
  window.location.href = 'cart.html';
}



function initialize() {
  for (var i in imageLibrary){
    new Product(imageLibrary[i][0], imageLibrary[i][1]);
  }
}
console.log('event lister enabled');
initialize();

addCartBtnEl.addEventListener('submit', cartHandler);
userBtnEl.addEventListener('submit', purchaseHandler);
