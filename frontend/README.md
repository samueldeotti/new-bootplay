# Frontend Project - Samuel Deotti

This project aims to develop a front-end application for a vinyl record e-commerce platform. Users can view, search, and buy albums, add them to their collection, view their album collection, remove albums from the collection, view their wallet balance and points, credit balance, and see user transactions.

## Technologies Used

For the development of this application, **TypeScript** was used alongside the **React** framework, providing a structure for the application to create a dynamic and type-safe user interface.

Additionally, **Docker** was utilized for containerization, making the deployment process more efficient and consistent.

### All Technologies

- TypeScript
- React
- Tailwind CSS
- Unit Testing with React Testing Library
- Context API
- React Hot Toast
- Swiper Carousel
- Lucide React
- Axios
- Docker

## How to Build and Run the Application

1. Clone the project from GitHub:
    ```bash
    git clone https://github.com/bc-fullstack-05/samuel_henrique_bertolini_deotti.git
    ```
   or
    ```bash
    git clone git@github.com:bc-fullstack-05/samuel_henrique_bertolini_deotti.git
    ```

2. Navigate to the project directory:
    ```bash
    cd samuel_henrique_bertolini_deotti/frontend
    ```

3. Build and run Docker:
    ```bash
    docker compose up --build
    ```
    or
    ```bash
    npm install
    npm run dev
    ```

4. Wait for a new tab to open in your browser, or open it manually. The application will run on port 5173 with `npm run dev`, and on port 3000 with Docker. It may open on a different port. If you encounter issues, check the terminal for the specified port.
    ```bash
    http://localhost:5173/
    ```

    or
    ```bash
    http://localhost:3000/
    ```

## How to Stop the Application

To stop the application, press `Ctrl + C` in the terminal where Docker Compose or `npm run dev` and the development server are running.

## Routes

- `/`: `Landing page`
- `/signin`: `User sign-in page`
- `/signup`: `User sign-up page`
- `/dashboard`: `Dashboard for viewing, searching, and buying albums`
- `/albums/my-collection`: `Page to view and manage the user's album collection`
- `/wallet`: `Page to view and manage wallet balance, points, and see user transactions`
- `/profile`: `Page to view and change user personal info, such as name, email, and password`

## Testing

Nearly all components have been tested, with a few exceptions.

## Running Tests

You can run this to see if they pass.
```bash
npm test
``` 


Run this to see the coverage.
```bash
npm run coverage
```

## Template

The project was based on this Figma design: [Figma Wireframe](https://www.figma.com/design/fF2yIgh22phkAsgZKqeYh8/BootPlay---Wireframe)

The project used this API: [API](https://myfrota.pt/api)
<br />
The documentation for API: [API DOCUMENTATION](https://myfrota.pt/api/swagger-ui/index.html#/)

## Known Limitations

If you have saved an invalid token or userData in your local storage when you first entered the application, you need to log out and log in again, as there is currently no verification for this.
 

