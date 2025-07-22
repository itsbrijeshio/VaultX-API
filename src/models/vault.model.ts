import mongoose from "mongoose";

const vaultSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vault = mongoose.model("Vault", vaultSchema);
export default Vault;
