"use client";

import Theme from "@/app/Providers/Theme";
import { Loader } from "@/components/Loader/Loader";
import { Toast } from "@/components/Toast/Toast";
import { validateEmail, validateName } from "@/lib/forms-and-validations";
import { Button, Card, Divider, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, HTMLInputTypeAttribute, useState } from "react";
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
};

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
    }

    setAccount(update);
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const register = async () => {
    setHasSubmitted(true);
    setErrorMessage("");
    if (Object.values(account).every(({ inErrorState }) => !inErrorState)) {
      setShowLoader(true);
      await fetch("/api/account/onboard", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: account.firstName.value,
          lastName: account.lastName.value,
          email: account.email.value,
          loginPage: [location.origin, "login"].join("/"),
        }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.status === 200) {
            goToLogIn(true);
          } else {
            setErrorMessage(data);
          }
        })
        .finally(() => {
          setShowLoader(false);
        });
    }
  };

  return (
    <Theme>
      <Loader open={showLoader} />

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
