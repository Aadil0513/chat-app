// backend/server.js
const fastify = require("fastify")({ logger: true });

fastify.register(require("fastify-socket.io"), {
  cors: { origin: "*" }
});

const start = async () => {
  await fastify.listen({ port: 4000 });
};
start();



// 25 examples 

// o1 global chat 
// fastify.ready(() => {
//   fastify.io.on("connection", (socket) => {
//     socket.on("send_message", (msg) => {
//       fastify.io.emit("receive_message", msg);
//     });
//   });
// });


// 02 group chat
// fastify.ready(() => {
//   fastify.io.on("connection", (socket) => {

//     socket.on("join_room", (room) => {
//       socket.join(room);
//     });

//     socket.on("send_message", ({ room, message }) => {
//       fastify.io.to(room).emit("receive_message", message);
//     });

//   });
// });


// 03 Online Users Tracking Server
// let users = [];

// fastify.ready(() => {
//   fastify.io.on("connection", (socket) => {
//     users.push(socket.id);
//     fastify.io.emit("users", users);

//     socket.on("disconnect", () => {
//       users = users.filter(id => id !== socket.id);
//       fastify.io.emit("users", users);
//     });
//   });
// });


// 04 show typing or user indicator


fastify.ready(() => {
  fastify.io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (room) => {
      socket.join(room);
      console.log(`${socket.id} joined room ${room}`);
    });

    socket.on("send_message", ({ room, message }) => {
      fastify.io.to(room).emit("receive_message", message);
    });

    socket.on("typing", (room) => {
      socket.to(room).emit("user_typing");
    });

    socket.on("stop_typing", (room) => {
      socket.to(room).emit("stop_typing");
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
});


// fastify.ready(() => {
//   fastify.io.on("connection", (socket) => {

//     socket.on("typing", (room) => {
//       socket.to(room).emit("user_typing");
//     });

//     socket.on("stop_typing", (room) => {
//       socket.to(room).emit("stop_typing");
//     });

//   });
// });

// 0 private chat
// fastify.ready(() => {
//   fastify.io.on("connection", (socket) => {

//     socket.on("private_message", ({ targetId, message }) => {
//       socket.to(targetId).emit("receive_message", message);
//     });

//   });
// });





// global and group chat 

// const fastify = require('fastify')({ logger: true });

// require('dotenv').config();
// const port = process.env.PORT || 4000;
// const frontendUrl = process.env.FRONTEND_URL;

// // Socket.io plugin register karein
// fastify.register(require('fastify-socket.io'), {
//   cors: {
//     origin: "http://localhost:3000", // Aapka Next.js URL
//     methods: ["GET", "POST"]
//   }
// });

//  for global communication 
// fastify.ready((err) => {
//   if (err) throw err;

//   // Socket Events
//   fastify.io.on('connection', (socket) => {
//     console.log(`User Connected: ${socket.id}`);
    

//     socket.on('send_message', (data) => {
//       // Sabhi connected clients ko message bhejna
//       fastify.io.emit('receive_message', data);
//     });

//     socket.on('disconnect', () => {
//       console.log('User Disconnected');
//     });
//   });
// });


// fastify.ready((err) => {
//   if (err) throw err;

//   fastify.io.on("connection", (socket) => {
//     console.log(`User Connected: ${socket.id}`);

//     // ✅ JOIN ROOM
//     socket.on("join_room", (room) => {
//       socket.join(room);
//       console.log(`User ${socket.id} joined room ${room}`);
//     });

//     // ✅ SEND MESSAGE TO ROOM ONLY
//     socket.on("send_message", ({ room, message }) => {
//       fastify.io.to(room).emit("receive_message", message);
//     });

//     // ✅ DISCONNECT
//     socket.on("disconnect", () => {
//       console.log("User Disconnected");
//     });
//   });
// });

// // Server Start
// const start = async () => {
//   try {
//     await fastify.listen({ port: 4000 });
//     console.log("Backend server running on port 4000");
//   } catch (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
// };
// start();