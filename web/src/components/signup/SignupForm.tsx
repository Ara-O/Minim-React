import Input from "./Input";
import { ChangeEvent, useState, FormEvent } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UserData = {
  username: string;
  emailAddress: string;
  password: string;
  passwordConfirmation: string;
};

export default function SignupForm() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [progressMessage, setProgressMessage] = useState("");
  const [userData, setUserData] = useState<UserData>({
    username: "Ara",
    emailAddress: "test@gmail.com",
    password: "test",
    passwordConfirmation: "test",
  });

  function createAccount(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (userData.password !== userData.passwordConfirmation) {
      setErrorMessage("Password and Confirmation Don't match");
    } else {
      setErrorMessage("")
      setProgressMessage("Registering...")
      axios
        .post("http://localhost:8080/api/register", userData)
        .then((res) => {
          console.log(res);
          // localStorage.setItem("token", res.data.token);
          // axios.defaults.headers.common["authorization"] =
          //   localStorage.getItem("token");
          // navigate("/home");
        })
        .catch((err) => {
          // setErrorMessage(err.message ?? err.response.data.message);
          // setTimeout(() => {
          //   setErrorMessage("");
          // }, 2500);
          setProgressMessage("")
          setErrorMessage(err.response.data);

        });

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
        <Button title="Sign Up"></Button>
      </form>
      <h6
        className="font-light text-[13.5px] mt-6"
        onClick={() => navigate("/login")}
      >
        Already have account?{" "}
        <span className="underline cursor-pointer"> Sign In</span>
      </h6>
      <br />
      <h6 className="font-light text-red-400 text-sm">{errorMessage}</h6>
      <h6 className="font-light text-white-400 text-sm">{progressMessage}</h6>
    </>
  );
}
