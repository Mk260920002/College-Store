import axios from 'axios'

let cart = document.querySelectorAll('.card-button');
let deleteItem=document.querySelectorAll('#delete')
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
      console.log(res);
   })
}
for(let i=0;i<deleteItem.length;i++){
  let btn=deleteItem[i];
  btn.addEventListener('click',(e)=>{
    let item=btn.dataset.item;
    console.log(item);
      deleteCart(item);
  })
}