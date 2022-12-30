import axios from "axios";
import moment from "moment";

export function initAdmin(socket) {
  let orderTableBody = document.querySelector("#orderTableBody");
  let orders = [];
  let markup;
  axios
    .get("/admin/order", {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
    .then((res) => {
      orders = res.data;
      markup = generateMarkup(orders);
      orderTableBody.innerHTML = markup;
    });
  function renderItem(items) {
    let element = Object.values(items);
    return element
      .map((data) => {
        return `
      <p>${data.item.P_name} qty-${data.qty}</p>
      `;
      })
      .join("");
  }
  function generateMarkup(orders) {
    return orders
      .map((order) => {
        return `<tr class="table-brdr">
             <td class="table-brdr ">
            <p class="mx-auto">${order._id}</p>
            <div>
            ${renderItem(order.items)}
            </div>
             </td>
             <td class="table-brdr">
            <p>₹${order.totalPrice}</p>
             </td>
             <td class="table-brdr">
            <p>${order.customerId.name}</p>
             </td>
             <td class="table-brdr">
            <p>${order.address}</p>
             </td>
             <td class="table-brdr">
             <div>
          <form action="/admin/order/status" method="POST"> 
          <input type="hidden" name="orderId" value="${order._id}"> 

               <select  name="status" onchange="this.form.submit()" 
               class="text-basic w-full p-2.5 bg-slate-400 text-white">
                 
                 <option value="Order Placed" ${order.status=="Order Placed"?"selected":""}
                 >Order Placed</option>
                 <option value="Preparing" ${order.status=="Preparing"?"selected":""}
                 >Preparing</option>
                 <option value="Out for delivery" ${order.status=="Out for delivery"?"selected":""}
                 >Out for delivery</option>
                 <option value="Delivered" ${order.status=="Delivered"?"selected":""}
                 >Delivered</option>
               </select>
               </form> 
             </div>
             </td>
             <td class="table-brdr">
            <p>${moment(order.createdAt).format("hh:mm A DD-MM-YY")}</p>
             </td>
             <td class="table-brdr">
            <p>${order.phone}</p>
             </td>
          </tr>`;
      })
      .join("");
  }
  socket.on('orderPlaced',data=>{
    orders.unshift(data);
    orderTableBody.innerHTML='';
    orderTableBody.innerHTML=generateMarkup(orders);
  })
}

