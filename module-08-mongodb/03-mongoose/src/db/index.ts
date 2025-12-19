// # Hier bauen wir gleich die MongoDB-Verbindung mit Mongoose
// const mongoose = require("mongoose")
import mongoose from "mongoose";

try {
  const connection = await mongoose.connect(process.env.MONGO_URI!);
  console.log("✔️ connected to MongoDB");
  console.log(`Using db: ${connection.connection.name}`);
} catch (error) {
  console.error("❌ MongoDB connection error: ", error);
  process.exit(1);
}
