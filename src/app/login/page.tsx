"use client";

import Theme from "@/app/Providers/Theme";
import { Toast } from "@/components/Toast/Toast";
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
  const [password, setPassword] = useState("");

  const handleEmailFieldUpdate: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setEmail(value);
    setHasInvalidEmail(!validateEmail(value));
  };

  const handlePasswordFieldUpdate: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setPassword(e.target.value);
  };

  const [loginErrorMessage, setLoginErrorMessage] = useState<string>();
  const handleLogin = async () => {
    setHasSubmitted(true);

    if (hasInvalidEmail || !password) {
      return;
    }

    await fetch("/api/account/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then(async (res) => {
      const data = await res.json();
      if (res.status === 200) {
        setLoginErrorMessage(undefined);
        route.push("/");
      } else {
        setLoginErrorMessage(data);
      }
    });
  };

  return (
    <Theme>
      <div className={styles.container}>
        <Card>
          <div className={styles.formContainer}>
            <Typography variant="h4">Sign in</Typography>
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
            <TextField
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordFieldUpdate}
              error={!!(hasSubmitted && !password)}
              helperText={
                !!(hasSubmitted && !password)
                  ? "Please enter a valid password"
                  : ""
              }
            />
            <Button variant="contained" onClick={handleLogin}>
              Sign in
            </Button>
          </div>
        </Card>
        <Divider orientation="horizontal">New to Bitiko ?</Divider>
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
      <Toast type="error" message={loginErrorMessage} />
    </Theme>
  );
};

export default Login;
