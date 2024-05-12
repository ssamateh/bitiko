"use client";

import Theme from "@/app/Providers/Theme";
import { Toast } from "@/components/Toast/Toast";
import { validateEmail, validateName } from "@/lib/forms-and-validations";
import { Button, Card, Divider, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, HTMLInputTypeAttribute, useState } from "react";
import { z } from "zod";
import styles from "./page.module.scss";

interface FieldProps {
  label: string;
  name: string;
  value: string;
  inErrorState: boolean;
  helperText: string;
  type?: HTMLInputTypeAttribute;
}

type Account = {
  firstName: FieldProps;
  lastName: FieldProps;
  email: FieldProps;
  password: FieldProps;
  confirmPassword: FieldProps;
};

const EmailValidator = z.string().email();

const CreateAccount = () => {
  const route = useRouter();

  const goToLogIn = (newUser = false) => {
    let path = "/login";
    if (newUser) {
      path += `?new-user=true`;
    }
    route.push(path);
  };

  const [account, setAccount] = useState<Account>({
    firstName: {
      name: "firstName",
      label: "First Name",
      value: "",
      inErrorState: true,
      helperText: "First name has to be atleast 2 alphabeths",
      type: "text",
    },
    lastName: {
      name: "lastName",
      label: "Last Name",
      value: "",
      inErrorState: true,
      helperText: "Last name has to be atleast 2 alphabeths",
      type: "text",
    },
    email: {
      name: "email",
      label: "Email",
      value: "",
      inErrorState: true,
      helperText: "A valid email is required",
      type: "email",
    },
    password: {
      name: "password",
      label: "Password",
      value: "",
      inErrorState: true,
      helperText:
        "Password has to be atleast 6 characters & can't be all numbers",
      type: "password",
    },
    confirmPassword: {
      name: "confirmPassword",
      label: "Re-enter Password",
      value: "",
      inErrorState: true,
      helperText: "Has to match the password you entered",
      type: "password",
    },
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleFieldUpdate: ChangeEventHandler<HTMLInputElement> = (e) => {
    const update = { ...account };
    const fieldName = e.target.name as keyof Account;
    const fieldValue = e.target.value.trim();
    update[fieldName].value = fieldValue;
    switch (fieldName) {
      case "firstName":
      case "lastName":
        update[fieldName].inErrorState = !validateName(fieldValue);
        break;
      case "email":
        update.email.inErrorState = !validateEmail(fieldValue);
        break;
      case "password":
        update.password.inErrorState = !(
          fieldValue.length >= 6 && Number.isNaN(Number(fieldValue))
        );
      case "confirmPassword":
        update.confirmPassword.inErrorState =
          update.confirmPassword.value !== update.password.value;
    }

    setAccount(update);
  };

  const [errorMessage, setErrorMessage] = useState("");

  const register = async () => {
    setHasSubmitted(true);
    setErrorMessage("");
    if (Object.values(account).every(({ inErrorState }) => !inErrorState)) {
      await fetch("/api/account/onboard", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: account.firstName.value,
          lastName: account.lastName.value,
          email: account.email.value,
          password: account.password.value,
        }),
      }).then(async (res) => {
        const data = await res.json();
        if (res.status === 200) {
          goToLogIn(true);
        } else {
          setErrorMessage(data);
        }
      });
    }
  };

  return (
    <Theme>
      <div className={styles.container}>
        <Card>
          <div className={styles.formContainer}>
            <Typography variant="h5">Welcome!</Typography>
            <Typography variant="caption">
              Please enter your information
            </Typography>
            {Object.values(account).map(
              ({ name, label, type, inErrorState, value, helperText }) => (
                <TextField
                  key={name}
                  name={name}
                  label={label}
                  type={type}
                  error={!!(hasSubmitted && inErrorState)}
                  value={value}
                  onChange={handleFieldUpdate}
                  helperText={
                    !!(hasSubmitted && inErrorState) ? helperText : ""
                  }
                />
              )
            )}
            <Button variant="contained" onClick={register}>
              Register
            </Button>
          </div>
        </Card>
        <Divider orientation="horizontal">Already have an account ?</Divider>
        <Button onClick={() => goToLogIn()}>Sign in</Button>
      </div>
      {!!errorMessage && <Toast type="error" message={errorMessage} />}
    </Theme>
  );
};

export default CreateAccount;
