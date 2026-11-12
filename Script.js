const appData = {
servers: [
{
id: "hub",
initials: "HH",
name: "Hangout Hub",
channels: [
{
id: "general",
name: "general",
topic: "General discussion and daily chat",
messages: [
{ author: "Alex", color: "#5865f2", time: "Today at 2:14 PM", text: "Hey everyone! Welcome to the new chat room." },
{ author: "Maya", color: "#eb459e", time: "Today at 2:16 PM", text: "Love the clean dark layout. Super smooth!" }
]
},
{
id: "media",
name: "clips-and-art",
topic: "Share screenshots, music, and creative projects",
messages: [
{ author: "Sam", color: "#f0b232", time: "Today at 1:05 PM", text: "Just finished working on a new synthwave track." }
]
},
{
id: "off-topic",
name: "off-topic",
topic: "Random thoughts, memes, and late night conversations",
messages: []
}
]
},
{
id: "dev",
initials: "DV",
name: "Builders & Code",
channels: [
{
id: "help",
name: "code-help",
topic: "Ask questions and troubleshoot projects",
messages: [
{ author: "Alex", color: "#5865f2", time: "Today at 11:30 AM", text: "Anyone working with WebSockets or WebRTC lately?" }
]
},
{
id: "showcase",
name: "showcase",
topic: "Show off what you are building",
messages: []
}
]
}
]
};
let activeServerId = "hub";
let activeChannelId = "general";
const serverRailEl = document.getElementById("serverRail");
const serverTitleEl = document.getElementById("serverTitle");
const channelListEl = document.getElementById("channelList");
const currentChannelNameEl = document.getElementById("currentChannelName");
const currentChannelTopicEl = document.getElementById("currentChannelTopic");
const messagesContainerEl = document.getElementById("messagesContainer");
const messageFormEl = document.getElementById("messageForm");
const messageInputEl = document.getElementById("messageInput");
const usernameInputEl = document.getElementById("usernameInput");
const currentUserAvatarEl = document.getElementById("currentUserAvatar");
const sidebarUserNameEl = document.getElementById("sidebarUserName");
function getActiveServer() {
return appData.servers.find(s => s.id === activeServerId);
}
function getActiveChannel() {
const server = getActiveServer();
return server.channels.find(c => c.id === activeChannelId);
}
function renderServers() {
serverRailEl.innerHTML = "";
appData.servers.forEach((server, index) => {
const btn = document.createElement("div");
btn.className = server-icon ${server.id === activeServerId ? "active" : ""};
btn.textContent = server.initials;
btn.title = server.name;
btn.onclick = () => {
activeServerId = server.id;
activeChannelId = server.channels[0].id;
renderAll();
};
serverRailEl.appendChild(btn);
if (index === 0) {
const div = document.createElement("div");
div.className = "divider";
serverRailEl.appendChild(div);
}
});
}
function renderChannels() {
const server = getActiveServer();
serverTitleEl.textContent = server.name;
channelListEl.innerHTML = <div class="category-label">Text Channels</div>;
server.channels.forEach(channel => {
const item = document.createElement("div");
item.className = channel-item ${channel.id === activeChannelId ? "active" : ""};
item.innerHTML = <span class="channel-hash">#</span> ${channel.name};
item.onclick = () => {
activeChannelId = channel.id;
renderChannels();
renderMessages();
};
channelListEl.appendChild(item);
});
}
function renderMessages() {
const channel = getActiveChannel();
currentChannelNameEl.textContent = channel.name;
currentChannelTopicEl.textContent = channel.topic;
messageInputEl.placeholder = Message #${channel.name};
messagesContainerEl.innerHTML = <div class="welcome-banner"> <h2>Welcome to #${channel.name}!</h2> <p>This is the start of the #${channel.name} channel. ${channel.topic}.</p> </div>;
channel.messages.forEach(msg => {
const msgEl = document.createElement("div");
msgEl.className = "message";
const initial = msg.author.charAt(0).toUpperCase();
msgEl.innerHTML = <div class="msg-avatar" style="background-color: ${msg.color};">${initial}</div> <div class="msg-content"> <div class="msg-header"> <span class="msg-author">${escapeHTML(msg.author)}</span> <span class="msg-time">${msg.time}</span> </div> <div class="msg-text">${escapeHTML(msg.text)}</div> </div>;
messagesContainerEl.appendChild(msgEl);
});
messagesContainerEl.scrollTop = messagesContainerEl.scrollHeight;
}
function escapeHTML(str) {
const div = document.createElement("div");
div.textContent = str;
return div.innerHTML;
}
function formatTime() {
const now = new Date();
return "Today at " + now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
messageFormEl.addEventListener("submit", (e) => {
e.preventDefault();
const text = messageInputEl.value.trim();
if (!text) return;
const author = usernameInputEl.value.trim() || "You";
const channel = getActiveChannel();
channel.messages.push({
author: author,
color: "#23a55a",
time: formatTime(),
text: text
});
messageInputEl.value = "";
renderMessages();
});
usernameInputEl.addEventListener("input", () => {
const name = usernameInputEl.value.trim() || "You";
currentUserAvatarEl.textContent = name.charAt(0).toUpperCase();
sidebarUserNameEl.textContent = name;
});
function renderAll() {
  renderServers();
  renderChannels();
  renderMessages();
}
renderAll();
