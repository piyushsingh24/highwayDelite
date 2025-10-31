import express from "express";
import Experience from "../model/experienceModel.js";

const router = express.Router();

//  GET all experiences
  router.get("/", async (req, res) => { 
    try {
      const experiences = await Experience.find();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

//  GET experience by ID
router.get("/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: "Experience not found" });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//----------------------need while create Admin Panel---------------------------------

//  POST create new experience
// router.post("/", async (req, res) => {
//   try {
//     const { title, location, price, image } = req.body;
//     const newExperience = new Experience({ title, location, price, image });
//     await newExperience.save();
//     res.status(201).json(newExperience);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // DELETE experience by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const experience = await Experience.findByIdAndDelete(req.params.id);
//     if (!experience) return res.status(404).json({ message: "Not found" });
//     res.json({ message: "Deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

export default router;
