import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import { SLUG_REGEX, KEY_REGEX } from "../config/constants";
import CoolURL from "../models/CoolURL";
import { Error } from "mongoose";
import { MongoError } from "mongodb";

export const indexGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const urls = await CoolURL.find();
    const response = urls?.map(doc => ({
      slug: doc.toObject().slug,
      url: doc.toObject().url
    }));
    res.json(response ?? []);
  } catch (error) {
    next(error);
  }
};

export const indexPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const coolUrl = new CoolURL(req.body);
    const createdUrl = await coolUrl.save();
    res.json(createdUrl);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      next(new HttpException(400, error.message.substr(8)));
    } else if (error instanceof MongoError) {
      next(new HttpException(422, "Duplicate key error"));
    } else {
      next(error);
    }
  }
};

export const slugGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    if (!SLUG_REGEX.test(slug)) {
      throw new HttpException(400, "Invalid slug");
    }

    const coolUrl = await CoolURL.findOne({ slug: slug });
    const response = coolUrl ? {
      slug: coolUrl.toObject().slug,
      url: coolUrl.toObject().url,
    } : null;
    
    if (response) {
      res.json(response);
    } else {
      throw new HttpException(404, "Slug not found");
    }
  } catch (error) {
    next(error);
  }
};

export const slugPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const { key } = req.body;
    if (!SLUG_REGEX.test(slug) || !KEY_REGEX.test(key)) {
      throw new HttpException(400, "Invalid slug or key");
    }

    const coolUrl = await CoolURL.findOne({ slug: slug });
    if (coolUrl) {
      if (coolUrl.toObject().key === key) {
        res.json(coolUrl);
      } else {
        throw new HttpException(403, "Access denied");
      }
    } else {
      throw new HttpException(404, "Slug not found");
    }
  } catch (error) {
    next(error);
  }
};
