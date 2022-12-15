import axios from 'axios'
import alert from 'alert'
let cart = document.querySelectorAll('.card-button');
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
