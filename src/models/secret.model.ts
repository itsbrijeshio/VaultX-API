import mongoose from "mongoose";

const secretSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["TOKEN", "PASSWORD", "API-KEY", "OTHER"],
      default: "TOKEN",
    },
    vault: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vault",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

secretSchema.index({ vault: 1, label: 1 }, { unique: true }); // Avoid duplicate label in a single vault

export default mongoose.model("Secret", secretSchema);
