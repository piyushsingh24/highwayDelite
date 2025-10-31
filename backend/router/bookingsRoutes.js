import express from "express";
import Checkout from "../model/checkoutModel.js";
import Experience from "../model/experienceModel.js";

import Promo from "../model/promoCode.js";

const router = express.Router();



router.post("/", async (req, res) => {
  try {
    const { fullName, email, experienceId, date, time, quantity, promoCode, agreedToPolicy } = req.body;

    // Basic validation
    if (!fullName || !email || !experienceId || !date || !time || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "All required fields must be filled." });
    }

    //  Check if experience exists
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found.",
      });
    }

    // Calculate subtotal and taxes
    const subtotal = experience.price * quantity;
    const taxes = Math.round(subtotal * 0.05); // 5% GST
    let discount = 0;

    // Apply promo code if provided
    if (promoCode) {
      const promo = await Promo.findOne({ promo: promoCode.toUpperCase() });
      if (promo) {
        const now = new Date();
        if (now <= new Date(promo.dateOfExpire)) {
          discount = Math.round((subtotal * promo.discount) / 100);
        } else {
          return res.status(400).json({
            success: false,
            message: "Promo code has expired.",
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid promo code.",
        });
      }
    }

    //  Calculate final total
    const finalTotal = subtotal + taxes - discount;

    // Save to MongoDB
    const checkout = new Checkout({
      fullName,
      email,
      experienceId,
      date,
      time,
      quantity,
      subtotal,
      discount,
      finalTotal,
      promoCode,
      agreedToPolicy,
    });

    const savedCheckout = await checkout.save();

    //  Return clean response
    res.status(201).json({
      success: true,
      message: "Checkout successful!",
      data: {
        id: savedCheckout._id,
        fullName: savedCheckout.fullName,
        email: savedCheckout.email,
        experienceTitle: experience.title,
        quantity: savedCheckout.quantity,
        subtotal: savedCheckout.subtotal,
        taxes,
        discount,
        finalTotal,
        promoApplied: promoCode || "N/A",
      },
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({ success: false, message: "Server error. " + error.message });
  }
});


//  Get single checkout by ID
router.get("/:id", async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) return res.status(404).json({ message: "Checkout not found" });
    res.status(200).json(checkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
