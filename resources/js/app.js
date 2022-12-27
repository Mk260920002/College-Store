import axios from 'axios'

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

 initAdmin();


