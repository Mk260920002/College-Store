import axios from "axios";
import moment from "moment";

import { initAdmin } from "./admin";
// import { response } from "express";

let cart = document.querySelectorAll("#add-btn");
let deleteItem = document.querySelectorAll("#delete-btn");


// for adding item in cart
function updateCart(item) {
  axios.post("./update-cart", item).then((res) => {
    document.querySelector("#totalQty").innerText = res.data.totalqty;
  });
}
for (let i = 0; i < cart.length; i++) {
  let btn = cart[i];
  btn.addEventListener("click", (e) => {
    let item = JSON.parse(btn.dataset.item);
    alert(item.P_name + " added in cart");
    updateCart(item);
    
  });
}
// for deleting item in cart
function deleteCart(item) {
  axios.post("./delete-cart", item).then((res) => {});
}
for (let i = 0; i < deleteItem.length; i++) {
  let btn = deleteItem[i];
  btn.addEventListener("click", (e) => {
    let item = JSON.parse(btn.dataset.item);
    deleteCart(item);
  });
}


//googlepay
onGooglePayLoaded()
const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    'gateway': 'example',
    'gatewayMerchantId': 'exampleGatewayMerchantId'
  }
};

const cardPaymentMethods={
  type:'CARD',
  parameters:{
    allowedCardNetworks : ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"],
    allowedCardAuthMethods : ["PAN_ONLY", "CRYPTOGRAM_3DS"],
  }
}
const googlePayConfiguration ={
  apiVersion:2,
  apiVersionMinor:0,
  allowedPaymentMethods:[cardPaymentMethods], 
}

let googlePayClient;


function onGooglePayLoaded(){
  console.log('src loaded');
  googlePayClient=new google.payments.api.PaymentsClient({
    environment:'TEST',

  });
  googlePayClient.isReadyToPay(googlePayConfiguration).
  then(response=>{
    if(response.result){
      createAddButton();
    }else{
      ///they cannot want to pay through gpay
      console.log("they cannot want to pay through gpay");
    }
  }).catch(error=>
   console.log('isReadyToPay error: ',error) );
}
function createAddButton(){
  const googlePayButton =
  googlePayClient.createButton({
    onclick:onGooglePayButtonClicked,
  })
document.getElementById('g-btn').appendChild(googlePayButton);
 
}

function onGooglePayButtonClicked(){
  const paymentDataRequest={...googlePayConfiguration};
  paymentDataRequest.merchantInfo={
    merchantId:'BCR2DN4TXLU4DGTC',
    merchantName:'NITRAAHAR',
  };
  paymentDataRequest.transactionInfo={
    totalPriceStatus:"FINAL",
    totalPrice:'100',
    currencyCode:'INR',
    countryCode: 'IN',
  };
  googlePayClient.loadPaymentData(paymentDataRequest)
  .then(paymentData => processPaymentData(paymentData))
  .catch(error => console.error('loadPaymentData error: ',error));
}
function processPaymentData(paymentData){
  fetch(ordersEndpointUrl,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:paymentData,
  })
}
// order status update on order tracker

let input = document.querySelector("#hiddenInput");
let sequence = document.querySelectorAll(".status-line");
let data = input ? input.value : null;
data = JSON.parse(data);
let time = document.createElement("small");

function updateStatus(data) {
  for (let i = 0; i < sequence.length; i++) {
    sequence[i].classList.remove("current");
    sequence[i].classList.remove("step-completed");
  }
  let completed = true;
  for (let i = 0; i < sequence.length; i++) {
    let status = sequence[i].dataset.status;

    if (completed) {
      sequence[i].classList.add("step-completed");
    }
    if (status === data.status) {
      time.innerText = moment(data.updatedAt).format("hh:mm A DD-MM-YY");
      sequence[i].appendChild(time);
      if (!sequence[i].nextElementSibling) {
        sequence[i].classList.add("step-completed");
      } else {
        sequence[i].classList.add("current");
      }

      completed = false;
    }
  }
}

updateStatus(data);
// socket

let socket = io();

// join
if (data) {
  socket.emit("join", `order_${data._id}`);
}

socket.on("orderUpdated", (result) => {
  const updatedOrder = data;
  updatedOrder.status = result.status;
  updatedOrder.updatedAt = moment().format();

  updateStatus(updatedOrder);
});

let url = window.location.pathname;
if (url.includes("admin")) {
  initAdmin(socket);
  socket.emit("join", "adminRoom");
}
