import mongoose from "mongoose";

const experienceModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default:
        "Curated small-group experience. Certified guide. Safety first with gear included.",
    },
  },
  { timestamps: true }
);

const Experience = mongoose.model("Experience", experienceModel);

export default Experience;
  