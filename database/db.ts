import mongoose from "mongoose";

/**
 * 0 - Disconnected
 * 1 - Connected
 * 2 - Connecting
 * 3 - Disconnecting
 */

const mongooConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongooConnection.isConnected) {
    console.log("Using existing connection");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongooConnection.isConnected = mongoose.connections[0].readyState;
    if (mongooConnection.isConnected === 1) {
      console.log("Using existing connection");
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGODB_URI || "");

  mongooConnection.isConnected = mongoose.connections[0].readyState;
  console.log("Connected to MongoDB", mongooConnection.isConnected);
};

export const disconnect = async () => {

  if (process.env.NODE_ENV === "development") return;

  if (mongooConnection.isConnected === 0) return;
  await mongoose.disconnect();
  mongooConnection.isConnected = mongoose.connections[0].readyState;
  console.log("Disconnected from MongoDB", mongooConnection.isConnected);
};
