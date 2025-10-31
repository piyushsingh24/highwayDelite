import express from "express";
import env from 'dotenv/config'


import connectDB from "./Config/connectDb.js";
import experienceRoutes from "./router/experienceRoutes.js";
import bookingsRoutes from './router/bookingsRoutes.js'
import promoRoutes from "./router/promoRoutes.js"



//Used for Mock data Call
import Experience from "./model/experienceModel.js";
import experiences from './data/mockExperienceModel.js'

import {seedPromos} from "./data/SeedPromo.js"
import cors from "cors";

const app = express();


connectDB();

const importData = async () => {
  try {
    await Experience.deleteMany(); // clear old data
    await Experience.insertMany(experiences);
    console.log("Data Imported Successfully!");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

importData();
seedPromos();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/experiences", experienceRoutes);
app.use('/bookings' , bookingsRoutes)
app.use('/promo' , promoRoutes)

// Root route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

export default app;

//  Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
