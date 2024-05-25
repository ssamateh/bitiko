import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  CodeInline,
} from "@react-email/components";
import * as React from "react";

export const VerificationCode = ({
  code,
  firstName,
}: {
  code: string;
  firstName: string;
}) => (
  <Html>
    <Head />
    <Preview>One Time Verification Code from lumo</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <h1 style={heading}>lumo</h1>
          <Hr style={hr} />
          <Text style={paragraph}>Hello {firstName}</Text>
          <Text style={paragraph}>
            Please enter the following code to login to your account:
          </Text>
          <Text style={paragraph}>
            <CodeInline style={codeBlock}>{code}</CodeInline>
          </Text>
          <Text style={paragraph}>
            This code is valid for <b>20 minutes</b>
          </Text>
          <Text style={paragraph}>
            If you believe you received this email in error. Please ignore or
            give us a call.
          </Text>
          <Text style={paragraph}>See you on lumo soon!</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default VerificationCode;

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

const codeBlock: React.CSSProperties = {
  color: "rgb(0.128,128)",
  fontStyle: "italic" as const,
};
