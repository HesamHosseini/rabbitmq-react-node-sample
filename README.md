# RabbitMQ Sample Node Project

This project consists of two Node.js applications: a consumer and a publisher. Both applications work with RabbitMQ, which runs on Docker. Additionally, there is a sample client implementation using React.

## Project Structure

- `consumer`: Node.js application that consumes messages from RabbitMQ.
- `publisher`: Node.js application that publishes messages to RabbitMQ.
- `rabbitmq-frontend/`: Sample React client implementation.

## Prerequisites

- Docker
- Node.js
- RabbitMQ

## Getting Started

1. Clone the repository:
    ```sh
    git clone https://github.com/HesamHosseini/rabbitmq-sample-node.git
    cd rabbitmq-sample-node
    ```

2. Start RabbitMQ using Docker:
    ```sh
    docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672  -v rabbitmq_data:/var/lib/rabbitmq rabbitmq:4.0-management
    ```

3. Install dependencies for both consumer and publisher:
    ```sh
    npm install
    
    ```

4. Run the consumer and publisher:
    ```sh
    node consumer.js
    npm publisher.js
    ```

5. Navigate to the `rabbitmq-frontend` directory and follow the instructions in the README to start the React client.

## License

This project is licensed under the MIT License.
