import prisma from "@/db";
import { OnboardingProps, OtpLogin, SanitizedUser } from "@/interface";
import jwt from "jsonwebtoken";
import { env } from "process";
import WelcomeEmail from "emails/welcome";
import { sendEmail } from "../emailClient";
import VerificationCode from "emails/VerificationCode";

export const sendVerificationEmail = (email: string): Promise<string> =>
  prisma.user
    .findFirstOrThrow({ where: { email } })
    .then(async (account) => {
      const code = (Math.random() * 10).toString(32).slice(-6).toUpperCase();
      const shortLivedToken = jwt.sign({ code, email }, env.PRIVATE_KEY!, {
        expiresIn: "20m",
      });

      await sendEmail({
        to: email,
        from: "Lumo <support@lumo-gambia.com>",
        subject: "Lumo Verification Code",
        template: VerificationCode({
          code,
          firstName: account.firstName,
        }),
      });
      return shortLivedToken;
    })
    .catch((e) => {
      console.error(e);
      throw new Error(
        "lumo does not have a user with that email. If the email address is correct, you might want to create an account"
      );
    });

export const login = async ({
  otp,
  shortLivedToken,
}: OtpLogin): Promise<{ user: SanitizedUser; token: string }> => {
  try {
    const { code, email } = jwt.verify(shortLivedToken, env.PRIVATE_KEY!) as {
      code: string;
      email: string;
    };
    if (otp.toUpperCase() === code) {
      const user = await prisma.user.update({
        data: { lastLogInAt: new Date() },
        where: { email },
      });
      const { firstName, middleName, lastName } = user;
      return {
        user: { firstName, middleName, lastName },
        token: jwt.sign(user, env.PRIVATE_KEY!, { expiresIn: "1d" }),
      };
    }
    throw new Error("Invalid code");
  } catch (e) {
    console.error(e);
    throw new Error("Invalid or expired code. Please try resending a new code");
  }
};

export const onboard = async ({
  email,
  firstName,
  lastName,
  loginPage,
}: OnboardingProps): Promise<void> =>
  prisma.user
    .findFirst({ where: { email } })
    .then((existingUser) => {
      if (existingUser) {
        throw new Error(
          "User with email already exist. Please sign in instead"
        );
      }
    })
    .then(() => prisma.user.create({ data: { firstName, lastName, email } }))
    .then(async (account) => {
      try {
        await sendEmail({
          to: account.email,
          from: "Lumo <support@lumo-gambia.com>",
          subject: "Welcome to Lumo Gambia",
          template: WelcomeEmail({
            firstName,
            loginPage,
          }),
        });
      } catch (e) {
        console.error(e);
      }
      return;
    });
