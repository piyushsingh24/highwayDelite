import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    experienceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experience",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    finalTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    promoCode: {
      type: String,
      trim: true,
    },
    agreedToPolicy: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);  

const Checkout = mongoose.model("Checkout", checkoutSchema);

export default Checkout;
