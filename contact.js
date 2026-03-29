document.querySelector("form").addEventListener("submit", async (e) => {

  e.preventDefault();

  const loader = document.getElementById("loader");
  const btnText = document.getElementById("btnText");
  const statusMsg = document.getElementById("statusMsg");

  loader.style.display = "inline-block";
  btnText.textContent = "Sending...";
  statusMsg.textContent = "";

  const formData = {
    name: document.querySelector("#name").value,
    email: document.querySelector("#email").value,
    subject: document.querySelector("#subject").value,
    message: document.querySelector("#message").value
  };

  try {

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    loader.style.display = "none";
    btnText.textContent = "Send Message";

    if(data.success){
      statusMsg.textContent = "Email sent successfully ✓";
      statusMsg.style.color = "green";
      document.querySelector("form").reset();
    }
    else{
      statusMsg.textContent = "Failed to send email.";
      statusMsg.style.color = "red";
    }

  } catch(err){

    loader.style.display = "none";
    btnText.textContent = "Send Message";
    statusMsg.textContent = "Server error.";
    statusMsg.style.color = "red";

  }

});