# RabbitMQ Sample Node Project

This project consists of two Node.js applications: a consumer and a publisher. Both applications work with RabbitMQ, which runs on Docker. Additionally, there is a sample client implementation using React.

## Project Structure

- `consumer/`: Node.js application that consumes messages from RabbitMQ.
- `publisher/`: Node.js application that publishes messages to RabbitMQ.
- `client/`: Sample React client implementation.

## Prerequisites

- Docker
- Node.js
- RabbitMQ

## Getting Started

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/rabbitmq-sample-node.git
    cd rabbitmq-sample-node
    ```

2. Start RabbitMQ using Docker:
    ```sh
    docker-compose up -d
    ```

3. Install dependencies for both consumer and publisher:
    ```sh
    cd consumer
    npm install
    cd ../publisher
    npm install
    ```

4. Run the consumer and publisher:
    ```sh
    cd consumer
    npm start
    cd ../publisher
    npm start
    ```

5. Navigate to the `client` directory and follow the instructions in the README to start the React client.

## License

This project is licensed under the MIT License.