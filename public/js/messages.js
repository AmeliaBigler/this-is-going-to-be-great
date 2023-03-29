var url = window.location.pathname;
var id = url.split("/");
var isMechanic = document.getElementById("isMechanic").dataset.ismechanic;
const chat = document.querySelector("#chat");

var socket = io({ query: { room: id[2] } });

const sendChat = async () => {
    var input = document.querySelector("#chatInput")
    var content = document.querySelector("#chatInput").value.trim();
    input.value = ""
    if (content) {
        const response = await fetch(`/messages/${id[2]}`, {
            method: "post",
            body: JSON.stringify({ content: content }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            socket.emit("message", {
                content: content,
                roomId: id[2]
            });

            const divEl = document.createElement("div");
            divEl.textContent = "You";
            divEl.setAttribute("class", "yours messages")
            chat.appendChild(divEl);
            const divEl2 = document.createElement("div");
            divEl2.textContent = content;
            divEl.appendChild(divEl2);
            divEl2.setAttribute("class", "message")
        }
    }
}
socket.on("newMessage", (data) => {
    const divEl = document.createElement("div");
    divEl.textContent = "Them";
    divEl.setAttribute("class", "mine messages")
    chat.appendChild(divEl);
    const divEl2 = document.createElement("div");
    divEl2.textContent = data;
    divEl.appendChild(divEl2);
    divEl2.setAttribute("class", "message")
})

var chatForm = document.getElementById("submit").addEventListener("click", sendChat)