import axios from 'axios'
import moment from 'moment'

import {initAdmin} from './admin'

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
  initAdmin(socket);
  socket.emit('join','adminRoom')
}
