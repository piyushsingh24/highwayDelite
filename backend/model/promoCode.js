import mongoose from "mongoose";

const promoSchema = new mongoose.Schema(
  {
    promo: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100, 
    },
    dateOfExpire: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Promo = mongoose.model("Promo", promoSchema);

export default Promo;
