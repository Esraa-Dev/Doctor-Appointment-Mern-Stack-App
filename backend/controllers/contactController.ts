import { Request, Response } from "express";
import { Contact, validateContact } from "../models/ContactSchema";
import { AsyncHandler } from "../utils/AsyncHandler";

export const createContactMessage = AsyncHandler(
  async (req: Request, res: Response) => {
    const { error } = validateContact(req.t).validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    await Contact.create(req.body);

    res.status(201).json({
      success: true,
      message: req.t("contact:successMessage"),
    });
  }
);
