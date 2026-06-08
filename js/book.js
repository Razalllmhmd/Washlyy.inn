import { db, auth } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

window.bookOrder = async function () {

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const pickupDate = document.getElementById("pickupDate").value;
  const service = document.getElementById("service").value;

  if (
    !name ||
    !phone ||
    !address ||
    !pickupDate ||
    !service
  ) {
    alert("Please fill all fields");
    return;
  }

  try {

    const user = auth.currentUser;

    console.log("Current User:", user);

    if (!user) {
      alert("Please login first");
      return;
    }

    const orderData = {
      userId: user.uid,
      email: user.email,
      name,
      phone,
      address,
      pickupDate,
      service,
      status: "Pickup Scheduled"
    };

    console.log("Saving Order:", orderData);

    const docRef = await addDoc(
      collection(db, "orders"),
      orderData
    );

    alert("Order Placed! Your ID: " + docRef.id);

    location.href = "dashboard.html";

  } catch (error) {

    console.error("Order Error:", error);
    alert(error.message);

  }
};