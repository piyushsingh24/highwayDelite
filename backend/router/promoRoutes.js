import express from "express";
import Promo from "../model/promoCode.js";

const router = express.Router();

router.post("/validate", async (req, res) => {
  try {
    const { promo } = req.body;


    if (!promo) {
      return res.status(400).json({ success: false, message: "Promo code is required" });
    }

    // Check if promo exists in database
    const validPromo = await Promo.findOne({ promo: promo.trim().toUpperCase() });

    if (!validPromo) {
      return res.status(404).json({ success: false, message: "Invalid promo code" });
    }

    //  Check if promo code has expired
    const now = new Date();
    if (now > validPromo.dateOfExpire) {
      return res.status(400).json({ success: false, message: "Promo code expired" });
    }

    // If valid
    return res.status(200).json({
      success: true,
      message: "Promo code applied successfully!",
      discount: validPromo.discount,
    });
  } catch (error) {
    console.error("Promo Validation Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { promo, discount, dateOfExpire } = req.body;

    //  Validation
    if (!promo || !discount || !dateOfExpire) {
      return res.status(400).json({
        success: false,
        message: "Please provide promo, discount, and dateOfExpire.",
      });
    }

    // Check if promo already exists
    const existingPromo = await Promo.findOne({ promo: promo.trim().toUpperCase() });
    if (existingPromo) {
      return res.status(400).json({
        success: false,
        message: "Promo code already exists.",
      });
    }

    //  Create and save new promo
    const newPromo = new Promo({
      promo: promo.trim().toUpperCase(),
      discount,
      dateOfExpire,
    });

    await newPromo.save();

    return res.status(201).json({
      success: true,
      message: "Promo code added successfully!",
      data: newPromo,
    });
  } catch (error) {
    console.error("Error adding promo:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
