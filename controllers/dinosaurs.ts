import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.1.0/mod.ts";
import db from "../models/db.ts";
import { ErrorHandler } from "../utils/middlewares.ts";

const database = db.getDatabase;
const dinosaurs = database.collection("dinosaurs");

interface Dinosaur {
  _id: {
    $oid: string;
  };
  name: string;
  weight: number;
  kingdom: string;
  phylum: string;
  clade: string;
}

export const createDinosaur: HandlerFunc = async (c: Context) => {
  try {
    if (c.request.headers.get("content-type") !== "application/json") {
      throw new ErrorHandler("Invalid body", 422);
    }
    const body = await (c.body) as Dinosaur;
    if (!Object.keys(body).length) {
      throw new ErrorHandler("Request body can not be empty!", 400);
    }
    const {name, weight, kingdom, phylum, clade} = body;
    const insertedDinosaur = await dinosaurs.insertOne({
      name,
      weight,
      kingdom,
      phylum,
      clade
    });
    return c.json(insertedDinosaur, 201);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};

export const getAllDinosaurs: HandlerFunc = async (c: Context) => {
  try {
    const dinosaurList: Dinosaur[] = await dinosaurs.find() as Dinosaur[];
    if (dinosaurList) {
      const list = dinosaurList.length
        ? dinosaurList.map((dinosaur) => {
          const {_id: {$oid}, name, weight, kingdom, phylum, clade} = dinosaur;
          return {id: $oid, name, weight, kingdom, phylum, clade};
        })
        : [];

      return c.json(list, 200);
    }
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
