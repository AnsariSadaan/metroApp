import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ticketToken: {
    type: String,
    required: true,
    unique: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  via: {
    type: [String], // Array of station names
    default: [], // Optional, can be empty
  },
  price: {
    type: Number,
    required: true,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Expired", "In Journey", "Completed"],
    default: "Active",
  },
});

export const Ticket = mongoose.model("Ticket", ticketSchema);
