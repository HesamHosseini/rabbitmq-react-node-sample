const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const amqp = require('amqplib');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:5173', // Allow connections from your React app
        methods: ['GET', 'POST'],
    },
});

// CORS middleware for Express
app.use(cors({
    origin: 'http://localhost:5173', // Allow your React app's origin
    methods: ['GET', 'OPTIONS'], // Allow GET and OPTIONS methods
    credentials: true, // Allow credentials if needed
}));

// Sample data
const notifyState = [
    { app: "fire", event: false, alarm: false },
    { app: "detect", event: false, alarm: false },
    { app: "face", event: false, alarm: false },
    { app: "plate", event: false, alarm: false }
];

// GET endpoint for /notifications
app.get('/notifications', (req, res) => {
    res.json(notifyState);
});

// Connect to RabbitMQ
async function connectToRabbit() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'messages';

        await channel.assertQueue(queue, { durable: false });

        // Consume messages from RabbitMQ
        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const message = msg.content.toString();
                console.log(`Received: ${message}`);

                // Send the message to all connected front-end clients
                io.emit('message', message);
                channel.ack(msg); // Acknowledge the message

                // Update the state
                try {
                    const messageObj = JSON.parse(message);

                    const find = notifyState.find((item) => item.app === messageObj.app);
                    if (find) {
                        find.event = messageObj.event;
                        find.alarm = messageObj.alarm;
                        console.log("Updated state for:", find.app);
                    }
                } catch (error) {
                    console.error('Error in parsing message:', error);
                }
            }
        });

        console.log('Consumer is waiting for messages...');
    } catch (error) {
        console.error('Error in consumer:', error);
    }
}

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// Connect to RabbitMQ
connectToRabbit();

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('A client disconnected:', socket.id);
    });
});