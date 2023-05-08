import Input from "./Input";
import { ChangeEvent, useState, FormEvent } from "react";
import Button from "./Button";
import axios from "axios";
import ErrorComponent from "../error/ErrorComponent";

type UserData = {
  username: string;
  emailAddress: string;
  password: string;
  passwordConfirmation: string;
};

function authenticate() {
  axios
    .get("/api/test")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function isEmpty(value: string): boolean {
  if (value.trim().length <= 0) return true;
  else return false;
}

export default function SignupForm() {
  let [errorMessage, setErrorMessage] = useState("");

  let [userData, setUserData] = useState<UserData>({
    username: "",
    emailAddress: "",
    password: "",
    passwordConfirmation: "",
  });

  function createAccount(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (userData.password !== userData.passwordConfirmation) {
      setErrorMessage("Password and Confirmation Don't match");
    } else {
      if (
        !isEmpty(userData.emailAddress) &&
        !isEmpty(userData.password) &&
        !isEmpty(userData.passwordConfirmation) &&
        !isEmpty(userData.username)
      ) {
        axios
          .post("/api/register", userData)
          .then((res) => {
            console.log(res);
            localStorage.setItem("token", res.data.token);
            axios.defaults.headers.common["authorization"] =
              localStorage.getItem("token");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form
        onSubmit={createAccount}
        className="mt-10 flex w-auto items-center max-w-[35rem] gap-7 flex-wrap justify-center gap-x-11"
      >
        <Input
          name="username"
          label="Username"
          type="text"
          onChange={handleChange}
          value={userData.username}
        />
        <Input
          name="emailAddress"
          label="Email Address"
          type="email"
          onChange={handleChange}
          value={userData.emailAddress}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={userData.password}
        />
        <Input
          name="passwordConfirmation"
          label="Re-Enter Password"
          type="password"
          onChange={handleChange}
          value={userData.passwordConfirmation}
        />
        <Button title="Sign Up" onclick={createAccount}></Button>
      </form>
      <br />
      {errorMessage && (
        <ErrorComponent
          message={errorMessage}
          onCancelPopup={() => setErrorMessage("")}
        />
      )}
    </>
  );
}
