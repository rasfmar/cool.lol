import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import { SLUG_REGEX, KEY_REGEX, URL_REGEX/*, IPV6_REGEX, IPV4_REGEX*/ } from "../config/constants";
import CoolURL from "../models/CoolURL";
import { nanoid } from "nanoid";
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
    const { url } = req.body;
    const ip: string = "";
    
    // TODO: track location, not IP, as this is accessible by those w/ key for slug
    /*
    let ip = req.headers['x-forwarded-for'] ?? "";
    if (!ip) {
      ip = req.connection.remoteAddress ?? "";
    }

    if (!IPV6_REGEX.test(`${ip}`) && !IPV4_REGEX.test(`${ip}`)) {
      throw new HttpException(500, "Internal service error");
    }
    */

    if (!URL_REGEX.test(url)) {
      throw new HttpException(400, "Invalid URL");
    }

    let slug: string = nanoid(5).toLowerCase();
    let key: string = nanoid(20).toLowerCase();
    let existingUrl = await CoolURL.find({ slug: slug, key: key });
    while (existingUrl.length > 0) {
      slug = nanoid(5).toLowerCase();
      key = nanoid(20).toLowerCase();
      existingUrl = await CoolURL.find({ slug: slug, key: key });
    }

    const coolUrl = new CoolURL({
      slug: slug,
      url: url,
      key: key,
      ip: ip,
      createdAt: Date.now()
    });
    
    const createdUrl = await coolUrl.save();
    res.json({
      slug: slug,
      key: key,
    });
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
    
    if (coolUrl?.toObject()?.deletedAt === -1 && response) {
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
    const ip: string = "";
    /*
    let ip = req.headers['x-forwarded-for'] ?? "";
    if (!ip) {
      ip = req.connection.remoteAddress ?? "";
    }

    if (!IPV6_REGEX.test(`${ip}`) && !IPV4_REGEX.test(`${ip}`)) {
      throw new HttpException(500, "Internal service error");
    }
    */

    if (!SLUG_REGEX.test(slug) || !KEY_REGEX.test(key)) {
      throw new HttpException(400, "Invalid slug or key");
    }

    const coolUrl = await CoolURL.findOne({ slug: slug });
    if (coolUrl && coolUrl.toObject().deletedAt === -1) {
      if (coolUrl.toObject().key === key) {
        let accesses: object[] = coolUrl.toObject().accesses;
        accesses.push({
          ip: ip,
          time: Date.now()
        });

        await CoolURL.updateOne(
          {
            slug: slug,
            key: key
          },
          { 
            $set: {
              accesses: accesses
            }
          }
        );

        const response = coolUrl.toObject();
        response.accesses = accesses;
        res.json(response);
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

export const slugDeletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const { key } = req.body;
    const ip: string = "";
    /*
    let ip = req.headers['x-forwarded-for'] ?? "";
    if (!ip) {
      ip = req.connection.remoteAddress ?? "";
    }

    if (!IPV6_REGEX.test(`${ip}`) && !IPV4_REGEX.test(`${ip}`)) {
      throw new HttpException(500, "Internal service error");
    }
    */

    if (!SLUG_REGEX.test(slug) || !KEY_REGEX.test(key)) {
      throw new HttpException(400, "Invalid slug or key");
    }

    const coolUrl = await CoolURL.findOne({ slug: slug });
    if (coolUrl && coolUrl.toObject().deletedAt === -1) {
      if (coolUrl.toObject().key === key) {
        let accesses: object[] = coolUrl.toObject().accesses;
        accesses.push({
          ip: ip,
          time: Date.now()
        });

        await CoolURL.updateOne(
          {
            slug: slug,
            key: key
          },
          { 
            $set: {
              accesses: accesses,
              deletedAt: Date.now()
            }
          }
        );

        res.status(200);
        res.json({
          message: "OK",
        });
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

export const slugClickGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const ip: string = "";
    /*
    let ip = req.headers["x-forwarded-for"] ?? "";
    if (!ip) {
      ip = req.connection.remoteAddress ?? "";
    }

    if (!IPV6_REGEX.test(`${ip}`) && !IPV4_REGEX.test(`${ip}`)) {
      throw new HttpException(500, "Internal service error");
    }
    */

    if (!SLUG_REGEX.test(slug)) {
      throw new HttpException(400, "Invalid slug");
    }

    const coolUrl = await CoolURL.findOne({ slug: slug });
    if (coolUrl && coolUrl.toObject().deletedAt === -1) {
      let clicks: object[] = coolUrl.toObject().clicks;
      clicks.push({
        ip: ip,
        time: Date.now()
      });

      await CoolURL.updateOne(
        {
          slug: slug
        },
        { 
          $set: {
            clicks: clicks
          }
        }
      );

      res.json({
        slug: coolUrl.toObject().slug,
        url: coolUrl.toObject().url,
      });
    } else {
      throw new HttpException(404, "Slug not found");
    }
  } catch (error) {
    next(error);
  }
};
