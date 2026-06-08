import { db, auth} from "./firebase.js";

import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

import {
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

async function loadOrders() {

  const snapshot = await getDocs(
    collection(db, "orders")
  );

  console.log("Orders found:", snapshot.size);

  let html = "";

  snapshot.forEach((order) => {

    const o = order.data();

    let statusClass = "pending";

    if (o.status === "Washing") statusClass = "washing";
    if (o.status === "Delivered") statusClass = "delivered";

    html += `
      <tr>
        <td>${o.name || ""}</td>
        <td>${o.phone || ""}</td>
        <td>${o.service || ""}</td>
        <td>${o.pickupDate || ""}</td>

        <td>
          <span class="status ${statusClass}">
            ${o.status || "Pending"}
          </span>
        </td>

        <td>
          <select id="status-${order.id}">
            <option value="Pickup Scheduled">Pickup Scheduled</option>
            <option value="Picked Up">Picked Up</option>
            <option value="Washing">Washing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>

          <button onclick="updateStatus('${order.id}')">
            Update
          </button>
        </td>
      </tr>
    `;
  });

  document.getElementById("orders").innerHTML = html;
}
window.adminLogout = async function () {

  try {

    await signOut(auth);

    alert("Admin Logged Out");

    location.href = "index.html";

  } catch (error) {

    console.error(error);
    alert(error.message);

  }
};

window.updateStatus = async function (id) {

  const status = document.getElementById(
    `status-${id}`
  ).value;

  try {

    await updateDoc(
      doc(db, "orders", id),
      {
        status: status
      }
    );

    alert("Order Updated Successfully");

    loadOrders();

  } catch (error) {

    console.error(error);
    alert(error.message);

  }
};

loadOrders();