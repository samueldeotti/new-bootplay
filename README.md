# Fullstack Project

This project aims to develop a fullstack application for a vinyl record e-commerce platform. Users can view, search, and buy albums, add them to their collection, view their album collection, and remove albums from the collection. The application includes both a front-end and a back-end, for album management and user management.

## Technologies Used

For the development of this application, **Java** was used alongside the **Spring Boot** framework, providing a robust structure for building the backend services following the principles of RESTful architecture. 

On the frontend, **React** with **TypeScript** was utilized to create a dynamic and type-safe user interface.

The database management was handled by **PostgreSQL**, with queries and data manipulations abstracted by the Spring Data JPA.

For message brokering and asynchronous communication between microservices, **RabbitMQ** was implemented.

Additionally, unit tests were written to ensure the reliability of the application, and **Docker** was used for containerization, making the deployment process more efficient and consistent.

## What Was Developed

- A PostgreSQL database using Spring Data JPA, containing tables to store user information, post categories, and all relevant post data;
- Endpoints that interact with the PostgreSQL database, supporting CRUD operations;
- Middlewares for validating request data and ensuring the user is authenticated and authorized to perform specific actions;
- A frontend interface built with React and TypeScript, offering a responsive and type-safe user experience;
- Asynchronous communication between services using RabbitMQ;
- Unit tests to verify the correctness of the application logic;
- Containerization of the application with Docker, ensuring consistency across different environments.


## How to run the application
1. Clone the project from GitHub:
    ```bash
    git clone https://github.com/samueldeotti/new-bootplay.git
    ```
   or
    ```bash
    git clone git@github.com:samueldeotti/new-bootplay.git
    ```

## Frontend

### How to Build and Run the Frontend Application

    
2. Navigate to the project directory:
    ```bash
    cd frontend
    ```

3. In another terminal tab, install the dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Wait for a new tab to open in your browser, or open it manually. The application usually runs on port 5173, but it may open on a different port. If you encounter issues, check the terminal for the specified port.
    ```bash
    http://localhost:5173/
    ```

### How to Stop the Frontend Application

To stop the application, press `Ctrl + C` in the terminal where Docker Compose and the development server are running.

### Frontend Routes

- /: `Landing page`
- /login: `User login page`
- /signup: `User signup page`
- /dashboard: `Dashboard for viewing, searching, and buying albums`
- /wallet `Page to view balance and points, and credit balance to the wallet`
- /albums/my-collection: `Page to view and manage the user's album collection`

## Backend

### Loyalty Program

The vinyl record e-commerce has implemented a loyalty program based on points to increase sales volume and attract new customers. After several meetings, the sales team defined a table of points per day of the week:

| Day    | Sunday | Monday | Tuesday | Wednesday | Thursday | Friday | Saturday |
|--------|--------|--------|---------|-----------|----------|--------|----------|
| Points | 25     | 7      | 6       | 2         | 10       | 15     | 20       |

### How to Build and Run the Backend Application

2. Navigate to the project directory:
    ```bash
    cd backend
    ```

3. Build and Run the Docker Compose services:
    ```bash
    docker compose up --build
    ```

### How to Stop the Backend Application

To stop the application, press `Ctrl + C` in the terminal where Docker Compose is running, or run the following command in the project root directory:
    ```bash
    docker-compose down
    ```

### Backend Ports

- API: `8080`
- PostgreSQL: `5432`
