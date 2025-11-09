1. const { createServer } = require("http");
"http" Node.js ka built-in core module hai — jo HTTP server banane ke kaam aata hai.
Bas humne directly createServer function ko extract kar liya , poore http object me se.

2. const httpServer = createServer(app); 

Yahan hum Express app ko ek HTTP server ke andar wrap kar rahe hain.
Matlab:

Express handle karega normal HTTP requests
aur Socket.io use karega same server real-time communication ke liye

3. const { Server } = require('socket.io');
 Ye line Socket.io package se Server class import kar rahi hai.
Ye class help karti hai WebSocket server banane me
jo real-time communication handle karega.

4. const io = new Server(server);

Ye line banati hai ek Socket.io server instance,
jo ab HTTP server ke sath attach ho gaya hai.

5. io.on("connection", (socket) => {
  console.log("A User Connected!");
 });

Ye ek event listener hai jo tab trigger hota hai
jab koi client (browser, mobile app, etc.) server se connect hota hai 

socket -> ek unique connection object hai
Ye represent karta hai ek particular client
Har connected user ke liye alag socket banta hai
Har socket ke paas ek unique id hoti hai:

6.  socket.on("disconnect",()=>{ 
    console.log("A User Disconnected!");
    });

socket.on("disconnect", ...)
Ye ek event listener hai.
Ye tab trigger hota hai jab ek specific client (user)
server se disconnect hota hai.

7. socket.on("ai-message", async (data) => {});
client "ai message" custom event trigger krta h aur server listen krta h

8. socket.emit("ai-response", {response}) ka matlab hai —
server ne client ko ek real-time message (event) bheja jisme
AI ka reply ya data present hai.

9. socket.on() -> Listen event from one client
10. io.emit() -> Send data to all clients
11. socket.emit() -> Send data to that same client
12. io.on() -> Listen new client connection