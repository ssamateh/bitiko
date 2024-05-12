import prisma from "@/db";
import { LoginUser, OnboardingUser, SanitizedUser } from "@/interface";
import { scrypt } from "crypto";
import jwt from "jsonwebtoken";
import { env } from "process";

const SALT = "b8d65261-eb93-45d8-a72e-7f8b71f2b7c1";

const getDerivedPassword = (password: string): Promise<string> =>
  new Promise((resolve, reject) => {
    scrypt(password, SALT, 64, async (err, derivedKey) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(derivedKey.toString("hex"));
      }
    });
  });

export const login = (
  user: LoginUser
): Promise<{ user: SanitizedUser; token: string }> =>
  prisma.user
    .findFirstOrThrow({ where: { email: user.email } })
    .then(async (account) => {
      const password = await getDerivedPassword(user.password);
      if (account.password !== password) {
        throw Error("Invalid password");
      }
      return prisma.user.update({
        data: { lastLogInAt: new Date() },
        where: { email: user.email },
      });
    })
    .then(({ password, ...account }) => ({
      user: {
        firstName: account.firstName,
        middleName: account.middleName,
        lastName: account.lastName,
      },
      token: jwt.sign(account, env.PRIVATE_KEY!, { expiresIn: "1d" }),
    }))
    .catch((e) => {
      console.log(e);
      // TODO: log actual error
      throw Error(
        "Invalid credentials. Please make sure your email & password combination is valid"
      );
    });

export const onboard = async (user: OnboardingUser): Promise<void> =>
  prisma.user
    .findFirst({ where: { email: user.email } })
    .then((existingUser) => {
      if (existingUser) {
        throw new Error(
          "User with email already exist. Please sign in instead"
        );
      } else {
        return getDerivedPassword(user.password);
      }
    })
    .then((password) => prisma.user.create({ data: { ...user, password } }))
    .then((account) => {
      // TODO: Send welcome email
      return;
    });
