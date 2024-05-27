import { Colors } from "@/interface";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const WelcomeEmail = ({
  firstName,
  loginPage,
}: {
  firstName: string;
  loginPage: string;
}) => (
  <Html>
    <Head />
    <Preview>You&apos;re now ready to start using lumo!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <h1 style={heading}>lumo</h1>
          <Hr style={hr} />
          <Text style={paragraph}>Hello {firstName}</Text>
          <Text style={paragraph}>
            Thanks for creating an account with us. You&apos;re now ready to
            start using all our services
          </Text>
          <Text style={paragraph}>
            You can login to your account by clicking the button below:
          </Text>
          <Button style={button} href={loginPage}>
            Login to lumo
          </Button>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const heading = {
  color: "#525f7f",

  fontSize: "24px",
  lineHeight: "32px",
  textAlign: "left" as const,
};

const button = {
  backgroundColor: Colors.primaryBg,
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};
