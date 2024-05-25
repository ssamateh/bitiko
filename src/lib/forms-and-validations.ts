import { z } from "zod";

const EmailValidator = z.string().email();

export const validateEmail = (email: string): boolean =>
  EmailValidator.safeParse(email).success;

export const validateName = (name: string): boolean =>
  /^[a-zA-Z]+$/.test(name) && name.length >= 2;
