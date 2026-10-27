const mongoose = require("mongoose");

/**
 * Connect to MongoDB Atlas using Mongoose.
 * Validates MONGODB_URI environment variable and handles errors gracefully.
 * Never logs credentials or full connection strings.
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || !uri.trim()) {
    console.error(
      "[FATAL] MONGODB_URI environment variable is not defined.\n" +
      "Please set MONGODB_URI in backend/.env before starting the server."
    );
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(
      `[INFO] Connected to MongoDB Atlas cluster (host: ${conn.connection.host}, database: ${conn.connection.name})`
    );
  } catch (error) {
    // Sanitize any accidental password leaks from error strings
    const sanitizedMessage = error.message.replace(
      /(mongodb(\+srv)?:\/\/[^:]+:)([^@]+)@/i,
      "$1*****@"
    );
    console.error(`[FATAL] MongoDB connection failed: ${sanitizedMessage}`);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("[WARN] MongoDB connection lost. Attempting reconnection...");
  });

  mongoose.connection.on("error", (err) => {
    console.error("[ERROR] MongoDB connection error occurred:", err.message);
  });
}

module.exports = connectDB;
