# Backend Project - Samuel Deotti

This project is a backend service for a vinyl record e-commerce platform, designed to implement a
customer loyalty program. The application handles record purchases, tracks customer points based on
purchase day, and manages various transaction metrics. The service is responsible for ensuring data
integrity, such as preventing duplicate albums per user, ensuring unique user emails, and handling
exceptions.

## Loyalty Program

The vinyl record e-commerce has implemented a loyalty program based on points to increase sales
volume and attract new customers. After several meetings, the sales team defined a table of points
per day of the week:

| Day    | Sunday | Monday | Tuesday | Wednesday | Thursday | Friday | Saturday |
|--------|--------|--------|---------|-----------|----------|--------|----------|
| Points | 25     | 7      | 6       | 2         | 10       | 15     | 20       |

## How to Build and Run the Application

1. Clone the project from GitHub:
    ```bash
    git clone https://github.com/bc-fullstack-05/samuel_henrique_bertolini_deotti.git
    ```
   or
    ```bash
    git clone git@github.com:bc-fullstack-05/samuel_henrique_bertolini_deotti.git
    ```

2. Navigate to the root directory of the project:
    ```bash
    cd samuel_henrique_bertolini_deotti/backend
    ```

3. Build and Run the Docker Compose:
    ```bash
    docker compose up --build
    ```

4. Access the API:
   - Once the application is running, you can access the API [Local Host](http://localhost:8080/) and [API DOCS](http://localhost:8080/swagger-ui/index.html#/), here you can find all endpoints and documentation.
     

## How to Stop the Application

To stop the application, simply press `Ctrl + C` in the terminal where Docker Compose is running.
Or run the following command in the root directory of the project:

```bash
docker-compose down
```

## Ports

- API: `8080`
- PostgreSQL: `5432`


## Known Limitations

- Although the project contains a comprehensive set of features, unit tests for the service and
  controller layers have NOT been implemented as per the original requirements.

- Additionally, a new metric was implemented under the /transactions/greatest/metrics endpoint. This
  metric retrieves the most sold album, the most expensive album, the user with the most albums, the
  user with the most points, and the user who spent the most.

