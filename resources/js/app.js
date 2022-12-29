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

 initAdmin();

// order status update on order tracker

let input=document.querySelector('#hiddenInput');
let sequence=document.querySelectorAll('.status-line');
let data=(input)?input.value:null;
data=JSON.parse(data);
let time=document.createElement('small');

function updateStatus(data){
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