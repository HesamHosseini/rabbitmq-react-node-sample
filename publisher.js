// publisher.js
const amqp = require('amqplib');


const notifyState = [
    {
        app: "fire",
        event: false,
        alarm: false
    },
    {
        app: "detect",
        event: false,
        alarm: false
    },
    {
        app: "face",
        event: false,
        alarm: false
    }
    ,
    {
        app: "plate",
        event: false,
        alarm: false
    }


];



function toggleRandomState(notifyState) {
    // Step 1: Randomly select an item from the notifyState array
    const randomIndex = Math.floor(Math.random() * notifyState.length);
    const selectedItem = notifyState[randomIndex];

    // Step 2: Randomly toggle the event and alarm properties
    if (Math.random() < 0.5) {
        selectedItem.event = !selectedItem.event; // Toggle event
    }
    if (Math.random() < 0.5) {
        selectedItem.alarm = !selectedItem.alarm; // Toggle alarm
    }

    return selectedItem;
}

async function startPublisher() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'messages';

        await channel.assertQueue(queue, { durable: false });

        setInterval(() => {

            const randomItem = toggleRandomState(notifyState);
            const message = JSON.stringify(randomItem)

            channel.sendToQueue(queue, Buffer.from(message));
            console.log(`Sent: ${message}`);
        }, 5000);
    } catch (error) {
        console.error('Error in publisher:', error);
    }
}

startPublisher();