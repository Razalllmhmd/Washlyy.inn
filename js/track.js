import { db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

window.trackOrder = async function () {

  const id =
    document.getElementById("orderId")
    .value
    .trim();

  if (!id) {
    alert("Enter Order ID");
    return;
  }

  try {

    const ref = doc(db, "orders", id);

    const snap = await getDoc(ref);

    if (!snap.exists()) {

      document.getElementById("result").innerHTML =
        "<p>❌ Order not found</p>";

      document.getElementById("trackingTimeline").style.display = "none";

      return;
    }

    const data = snap.data();

    document.getElementById("result").innerHTML = `

      <h3>${data.name}</h3>

      <p>
        <b>Service:</b>
        ${data.service}
      </p>

      <p>
        <b>Pickup Date:</b>
        ${data.pickupDate}
      </p>

    `;

    document.getElementById("trackingTimeline").style.display = "block";

    document.getElementById("currentStatus").innerText =
      data.status;

    updateTimeline(data.status);

  }

  catch (error) {

    console.error(error);

    alert(error.message);

  }

};

function updateTimeline(status) {

  document
    .querySelectorAll(".dot")
    .forEach(dot => {
      dot.classList.remove("active");
    });

  let step = 1;
  let width = "0%";

  switch(status) {

    case "Pickup Scheduled":
      step = 1;
      width = "0%";
      break;

    case "Picked Up":
      step = 2;
      width = "25%";
      break;

    case "Washing":
      step = 3;
      width = "50%";
      break;

    case "Out for Delivery":
      step = 4;
      width = "75%";
      break;

    case "Delivered":
      step = 5;
      width = "100%";
      break;
  }

  for (let i = 1; i <= step; i++) {

    document
      .getElementById(`c${i}`)
      .classList.add("active");
  }

  document
    .getElementById("progressFill")
    .style.width = width;
}