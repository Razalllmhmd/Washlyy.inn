import { db, auth } from "./firebase.js";

import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

window.logout = async function () {

  try {

    await signOut(auth);

    alert("Logged Out Successfully");

    location.href = "index.html";

  } catch (error) {

    console.error(error);
    alert(error.message);

  }
};

window.goBook = () => location.href = "book.html";
window.goTrack = () => location.href = "track.html";

onAuthStateChanged(auth, (user) => {

  console.log("AUTH STATE:", user);

  if (user) {
    console.log("USER UID:", user.uid);
    loadOrders(user);
  } else {
    console.log("USER IS NULL");
    location.href = "index.html";
  }

});

async function loadOrders(user) {

  const q = query(
    collection(db, "orders"),
    where("userId", "==", user.uid)
  );

  const snap = await getDocs(q);

  let html = "";
  let total = 0;
  let active = 0;
  let delivered = 0;

  snap.forEach(doc => {

    const o = doc.data();

    total++;

    if (o.status === "Delivered") {
      delivered++;
    } else {
      active++;
    }

    let statusClass = "pending";

    if (o.status === "Washing") statusClass = "washing";
    if (o.status === "Delivered") statusClass = "delivered";

    html += `
      <tr>
        <td>${o.name}</td>
        <td>${o.service}</td>
        <td>
          <span class="status ${statusClass}">
            ${o.status}
          </span>
        </td>
      </tr>
    `;
  });

  document.getElementById("orders").innerHTML = html;
  document.getElementById("totalOrders").innerText = total;
  document.getElementById("activeOrders").innerText = active;
  document.getElementById("deliveredOrders").innerText = delivered;
}

onAuthStateChanged(auth, (user) => {

  if (user) {
    loadOrders(user);
  } else {
    location.href = "index.html";
  }

});

window.openSupport = function () {
  document.getElementById("supportBox").classList.remove("hidden");
}

window.closeSupport = function () {
  document.getElementById("supportBox").classList.add("hidden");
}