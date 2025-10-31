import Promo from "../model/promoCode.js"; // adjust path based on your project

export const seedPromos = async () => {
  try {
    const existingPromos = await Promo.find({});
    if (existingPromos.length > 0) {
      console.log("Promos already exist, skipping seeding.");
      return;
    }

    const promos = [
      {
        promo: "WELCOME10",
        discount: 10,
        dateOfExpire: new Date("2025-12-31"),
      },
      {
        promo: "FESTIVE20",
        discount: 20,
        dateOfExpire: new Date("2025-11-30"),
      },
    ];

    await Promo.insertMany(promos);
    console.log(" Default promo codes seeded successfully!");
  } catch (error) {
    console.error(" Error seeding promos:", error);
  }
};
