// async function sendMessage() {
//   const input = document.getElementById("user-input");
//   const chatBox = document.getElementById("chat-box");

//   const text = input.value.trim();
//   if (!text) return;

//   addMessage(text, "user");
//   input.value = "";

//   try {
//     const response = await fetch("http://localhost:5000/chat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ message: text })
//     });

//     const data = await response.json();
//     addMessage(data.reply, "bot");

//   } catch (error) {
//     addMessage("Server error. Please try again.", "bot");
//   }
// }

// function addMessage(text, sender) {
//   const chatBox = document.getElementById("chat-box");

//   const div = document.createElement("div");
//   div.classList.add("message", sender);
//   div.textContent = text;

//   chatBox.appendChild(div);
//   chatBox.scrollTop = chatBox.scrollHeight;
// }

// function quickMessage(text) {
//   document.getElementById("user-input").value = text;
//   sendMessage();
// }

const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// Send on Enter key
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  // Add typing bubble
  const typingBubble = addTypingBubble();

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();

    // Remove typing bubble
    typingBubble.remove();

    addMessage(data.reply, "bot");

  } catch (error) {
    typingBubble.remove();
    addMessage("Server error. Please try again.", "bot");
  }
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = text;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addTypingBubble() {
  const div = document.createElement("div");
  div.classList.add("message", "bot", "typing");

  div.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;

  return div;
}

function quickMessage(text) {
  input.value = text;
  sendMessage();
}