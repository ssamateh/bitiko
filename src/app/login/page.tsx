"use client";

import Theme from "@/app/Providers/Theme";
import { Loader } from "@/components/Loader/Loader";
import { Toast } from "@/components/Toast/Toast";
import { Colors } from "@/interface";
import { validateEmail } from "@/lib/forms-and-validations";
import { Button, Card, Divider, TextField, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import styles from "./page.module.scss";

const Login = () => {
  const route = useRouter();
  const searchParams = useSearchParams();

  const goToCreateAccount = () => {
    route.push("/create-account");
  };

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [email, setEmail] = useState("");
  const [hasInvalidEmail, setHasInvalidEmail] = useState(true);
  const [otp, setOtp] = useState("");

  const handleEmailFieldUpdate: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setEmail(value.toLocaleLowerCase());
    setHasInvalidEmail(!validateEmail(value));
  };

  const handlePasswordFieldUpdate: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setOtp(e.target.value);
  };

  const [loginErrorMessage, setLoginErrorMessage] = useState<string>();

  const hideLoader = () => {
    setShowLoader(false);
  };

  const requestVerificationEmail = async () => {
    setShowLoader(true);
    setOtp("");
    await fetch("/api/account/send-verification-email", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 200) {
          setLoginErrorMessage(undefined);
          setShortLivedToken(data.token);
        } else {
          setLoginErrorMessage(data);
        }
      })
      .finally(hideLoader);
  };

  const otpLogin = async () => {
    setShowLoader(true);
    await fetch("/api/account/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp, shortLivedToken }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 200) {
          setLoginErrorMessage(undefined);
          route.push("/");
        } else {
          setLoginErrorMessage(data);
        }
      })
      .finally(hideLoader);
  };

  const handleLogin = async () => {
    setLoginErrorMessage(undefined);

    /**
     * Make an early return if one of the following is true
     * 1. Email is invalid (we need email to send verification code)
     * 2. We have short-lived token but to otp to verify
     */
    if (hasInvalidEmail || (!otp && shortLivedToken)) {
      setHasSubmitted(true);
      return;
    }
    // Lets validate the otp code
    if (shortLivedToken && otp) {
      await otpLogin();
    } else {
      // Let's send the verification email
      await requestVerificationEmail();
    }
  };

  const [shortLivedToken, setShortLivedToken] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  return (
    <Theme>
      <Loader open={showLoader} />
      <div className={styles.container}>
        <Card>
          <div className={styles.formContainer}>
            <Typography variant="h4">Sign in</Typography>
            {!shortLivedToken && (
              <TextField
                name="email"
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailFieldUpdate}
                error={!!(hasSubmitted && hasInvalidEmail)}
                helperText={
                  !!(hasSubmitted && hasInvalidEmail)
                    ? "Please enter a valid email"
                    : ""
                }
              />
            )}
            {!!shortLivedToken && (
              <div className={styles.verificationCode}>
                <Typography variant="caption" textAlign="center" padding={1.5}>
                  We&apos;ve sent an email with your verification code to{" "}
                  <span style={{ color: Colors.primaryColor }}>{email}</span>.
                  Please enter that code below to proceed.
                </Typography>
                <div className={styles.codeLabels}>
                  <span>Verification Code</span>
                  <Button onClick={requestVerificationEmail}>
                    Resend Code
                  </Button>
                </div>
                <TextField
                  name="otp"
                  value={otp}
                  onChange={handlePasswordFieldUpdate}
                  error={!!(hasSubmitted && !otp)}
                  helperText={
                    !!(hasSubmitted && !otp) ? "Please enter a valid code" : ""
                  }
                />
              </div>
            )}
            <Button variant="contained" onClick={handleLogin}>
              {!!shortLivedToken ? "Sign in" : "Continue"}
            </Button>
          </div>
        </Card>
        <Divider orientation="horizontal">New to lumo ?</Divider>
        <Button onClick={goToCreateAccount}>Create an account</Button>
      </div>

      <Toast
        type="success"
        message={
          searchParams.get("new-user") === "true"
            ? "Thanks for joining the club. Let's get started"
            : undefined
        }
      />
      {!!loginErrorMessage && (
        <Toast key="login-error" type="error" message={loginErrorMessage} />
      )}
    </Theme>
  );
};

export default Login;
