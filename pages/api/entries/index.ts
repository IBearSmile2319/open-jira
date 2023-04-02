import { connect, disconnect } from "@/database";
import { Entry, IEntry } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string, error?: any } | IEntry[] | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return getEntries(res);

    case "POST":
      return postEntries(req, res);

    default:
      return res.status(400).json({ message: "Endpoint not found" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
    
  connect();
  const entries = await Entry.find().sort({ createdAt: "ascending" });
  disconnect();

  res.status(200).json(entries);
};

const postEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = "" } = req.body;

  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }

  const newEntry = new Entry({ description });

  try {
    await connect();
    await newEntry.save();
    await disconnect();

    return res.status(201).json(newEntry);
  } catch (error) {
    await disconnect();
    return res.status(500).json({ message: "Something went wrong", error });
  }
};
