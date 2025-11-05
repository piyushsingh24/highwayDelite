# Highway Delite

Highway Delite is a full-stack web application for booking curated small-group adventure experiences. Users can browse, search, and book experiences like kayaking, hiking, and more, with a seamless checkout process.

## Features

- **Browse Experiences**: View a grid of available adventure experiences with images, locations, and prices.
- **Search Functionality**: Search experiences by title or location.
- **Experience Details**: Detailed view of each experience.
- **Booking System**: Complete booking flow with checkout and confirmation.
- **Promo Codes**: Apply discount codes during checkout.
- **Responsive Design**: Built with Tailwind CSS for mobile and desktop compatibility.
- **Backend API**: RESTful API built with Express.js and MongoDB.

## Tech Stack

### Frontend

- **React 19**: Modern React with hooks and functional components.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router DOM**: Client-side routing.
- **Axios**: HTTP client for API calls.

### Backend

- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database with Mongoose ODM.
- **CORS**: Cross-origin resource sharing.
- **UUID**: For generating unique identifiers.

### Deployment

- **Netlify**: Hosting for frontend and serverless functions.
- **Netlify Functions**: Serverless backend deployment.

## Installation and Setup

### Prerequisites

- Node.js (version 20.19+ or 22.12+ recommended)
- MongoDB (local or cloud instance like MongoDB Atlas)

### Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd highwayDelite/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory:

   ```
   MONGODB_URI=mongodb://127.0.0.1:27017/highwaydelite
   ```

   (Or use your MongoDB Atlas URI)

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the root directory:

   ```bash
   cd highwayDelite
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## Usage

1. **Home Page**: Browse and search for experiences.
2. **Details Page**: Click "View Details" to see more about an experience.
3. **Checkout**: Proceed to book and apply promo codes if available.
4. **Confirmation**: Receive booking confirmation.

## API Endpoints

### Experiences

- `GET /experiences` - Get all experiences
- `GET /experiences/:id` - Get experience by ID

### Bookings

- `POST /bookings` - Create a new booking
- `GET /bookings/:id` - Get booking by ID

### Promo Codes

- `POST /promo/validate` - Validate promo code

## Project Structure

```
highwayDelite/
├── backend/
│   ├── Config/
│   │   └── connectDb.js
│   ├── data/
│   │   ├── mockExperienceModel.js
│   │   └── SeedPromo.js
│   ├── model/
│   │   ├── checkoutModel.js
│   │   ├── experienceModel.js
│   │   └── promoCode.js
│   ├── router/
│   │   ├── bookingsRoutes.js
│   │   ├── experienceRoutes.js
│   │   └── promoRoutes.js
│   ├── Index.js
│   ├── package.json
│   └── .env
├── netlify/
│   └── functions/
│       └── server.js
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── BookingConformation.jsx
│   │   ├── Checkout.jsx
│   │   ├── Details.jsx
│   │   ├── Home.jsx
│   │   └── Navbar.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml
└── README.md
```

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request.

## License

This project is licensed under the ISC License.
