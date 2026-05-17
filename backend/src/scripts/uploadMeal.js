import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { Meal } from "../models/meal.model.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Load meals data (resolved relative to this file)
const mealsFile = path.join(__dirname, "..", "..", "data", "available-meals.json");
const meals = JSON.parse(fs.readFileSync(mealsFile, "utf-8"));

async function uploadAndSave() {
  try {
    // Connect to MongoDB and wait for connection
    await mongoose.connect(process.env.MONGODB_URI);

    for (const meal of meals) {
      // Resolve local image path relative to repository
      const imagePath = path.join(__dirname, "..", "..", "public", meal.image);

      if (!fs.existsSync(imagePath)) {
        console.error(`Image not found for ${meal.name}: ${imagePath}`);
        continue;
      }

      const publicId = meal.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-_]/g, "");

      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "meals",
        public_id: publicId,
        overwrite: true,
      });

      // Save meal data with Cloudinary public id (sanitized meal name) to MongoDB
      await Meal.updateOne(
        { id: meal.id },
        {
          id: meal.id,
          name: meal.name,
          price: Number(meal.price),
          description: meal.description,
          image: publicId,
          quantity: meal.quantity || 0,
        },
        { upsert: true }
      );

      console.log(`Uploaded: ${meal.name} → ${result.secure_url}`);
    }

    console.log("All meals uploaded and saved to MongoDB!");
  } catch (err) {
    console.error("Error uploading meals:", err);
  } finally {
    await mongoose.disconnect();
  }
}

uploadAndSave();

