import axios from 'axios'
import moment from 'moment'

import {initAdmin} from './admin'
import noty from 'noty'
import { ConnectionStates } from 'mongoose';
let cart = document.querySelectorAll('#add-btn');
let deleteItem=document.querySelectorAll('#delete-btn')

// for adding item in cart
function updateCart(item){
   axios.post('./update-cart',item).then(res=>{
     
     document.querySelector('#totalQty').innerText=res.data.totalqty;
   })
}
for(let i=0;i<cart.length;i++){
    let btn=cart[i];         
    btn.addEventListener('click',(e)=>{
        let item= JSON.parse(btn.dataset.item);
        updateCart(item);

    })
}
// for deleting item in cart
function deleteCart(item){
   axios.post('./delete-cart',item).then(res=>{
    return res.redirect('/cart');
   })
}
for(let i=0;i<deleteItem.length;i++){
  let btn=deleteItem[i];
  btn.addEventListener('click',(e)=>{
    let item=JSON.parse(btn.dataset.item);
    deleteCart(item);   
  })
}



// order status update on order tracker

let input=document.querySelector('#hiddenInput');
let sequence=document.querySelectorAll('.status-line');
let data=(input)?input.value:null;
data=JSON.parse(data);
let time=document.createElement('small');

function updateStatus(data){
  for(let i=0;i<sequence.length;i++){
    sequence[i].classList.remove('current')
    sequence[i].classList.remove('step-completed')
  }
  let completed=true;
 for(let i=0;i<sequence.length;i++){
  let status=sequence[i].dataset.status;
  
  if(completed){
    sequence[i].classList.add('step-completed');
  }
  if(status===data.status){
    time.innerText=moment(data.updatedAt).format('hh:mm A DD-MM-YY')
  sequence[i].appendChild(time)
    if(!sequence[i].nextElementSibling){
      sequence[i].classList.add('step-completed');
    }
  else{  sequence[i].classList.add('current'); }
    
    completed=false;
  }
  
 }

}

updateStatus(data);
// socket

let socket=io()
initAdmin(socket);
// join
if(data){
socket.emit('join' ,`order_${data._id}`);
}

socket.on('orderUpdated',(result)=>{
 const updatedOrder=data;
   updatedOrder.status=result.status;
   updatedOrder.updatedAt=moment().format()
   
   updateStatus(updatedOrder);
   
})

let url=window.location.pathname
if(url.includes('admin')){
  socket.emit('join','adminRoom')
}

// cart items deletion realtime through socket.io

let div=document.querySelector('.wrapper')
function createCrtMarup(cart){
  let arr= Object.values(cart.items);
  return arr
    .map((element) => {
      return `
      <div class="flex items-center justify-between px-60">
      <div class=" flex py-4 items-center" >
    <div>
      <img class="w-32 " src="img/${element.item.img}" alt="">
    </div>
     <div class="mx-6">
      <h2>${element.item.P_name}</h2>
     </div>
     <div>
        <span class="pr-1">Qty:</span><span class="mr-2"> ${element.qty} </span>
      </div>
     </div>
     <div class="flex items-center justify-between">
      
     <div class="pr-32">
      <span>₹${element.item.Price} </span> 
     </div>
     <div>
      
      <button data-item="${JSON.stringify(element)}"  id="delete-btn" class="card-button px-1 py-1 items-center rounded-md text-sm">
                  <span class="inline-block">- less</span>
      </button>
    
  </div>
  </div>
  </div>
      `
  }).join('')
}
// now i am going to do agax call ag get requext

axios.get("./user/detail", {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
    .then((user) => {
   // console.log(user)
     if(user){
      socket.emit('join' ,`user_${user._id}`);
      
     }
    });
socket.on('itemsDeleted',cart=>{
  console.log(cart);
})