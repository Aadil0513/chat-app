// backend/server.js
const fastify = require('fastify')({ logger: true });

require('dotenv').config();
const port = process.env.PORT || 4000;
const frontendUrl = process.env.FRONTEND_URL;

// Socket.io plugin register karein
fastify.register(require('fastify-socket.io'), {
  cors: {
    origin: "http://localhost:3000", // Aapka Next.js URL
    methods: ["GET", "POST"]
  }
});

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


fastify.ready((err) => {
  if (err) throw err;

  fastify.io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // ✅ JOIN ROOM
    socket.on("join_room", (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room ${room}`);
    });

    // ✅ SEND MESSAGE TO ROOM ONLY
    socket.on("send_message", ({ room, message }) => {
      fastify.io.to(room).emit("receive_message", message);
    });

    // ✅ DISCONNECT
    socket.on("disconnect", () => {
      console.log("User Disconnected");
    });
  });
});

// Server Start
const start = async () => {
  try {
    await fastify.listen({ port: 4000 });
    console.log("Backend server running on port 4000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();