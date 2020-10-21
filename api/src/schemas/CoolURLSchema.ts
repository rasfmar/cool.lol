import { Schema } from "mongoose";
import { KEY_REGEX, SLUG_REGEX, URL_REGEX } from "../config/constants";

const urlSchema = new Schema({
  slug: {
    type: String,
    required: [true, "Slug required"],
    lowercase: true,
    trim: true,
    match: SLUG_REGEX,
    unique: true,
  },
  url: {
    type: String,
    required: [true, "URL required"],
    match: URL_REGEX,
  },
  key: {
    type: String,
    required: [true, "Secret key required"],
    match: KEY_REGEX,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
    min: 0,
  },
  createdAt: {
    type: Number,
    default: 0,
    min: 0,
  },
  deletedAt: {
    type: Number,
    default: 0,
    min: 0,
  },
}, {
  collection: "urls",
});

export default urlSchema;
