import { Schema, model, Document } from "mongoose";
import { ICredential } from "../global";


const credentialSchema = new Schema<ICredential>(
  {
    credentialId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    credential: {
      type: Schema.Types.Mixed,
      required: true,
    },
    issuedAt: {
      type: Date,
      default: Date.now,
    },
    issuedBy: {
      type: String,
      required: true,
    },
    isVerified: { type: Boolean, default: false },
    verifiedBy: { type: String },
    verifiedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);


export const Credential =
  model<ICredential>("Credential", credentialSchema);
