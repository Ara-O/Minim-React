import Input from "./Input";
import { ChangeEvent, useState, FormEvent } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import PopupComponent from "../error/ErrorComponent";
import axios from "axios";

type UserData = {
  emailAddress: string;
  password: string;
};

function isEmpty(value: string): boolean {
  if (value.trim().length <= 0) return true;
  else return false;
}

export default function LoginForm() {
  const navigate = useNavigate();
  let [popupMessage, setPopupMessage] = useState("");

  let [userData, setUserData] = useState<UserData>({
    emailAddress: "",
    password: "",
  });

  function logIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isEmpty(userData.emailAddress) && !isEmpty(userData.password)) {
      axios
        .post("/api/login", userData)
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          axios.defaults.headers.common["authorization"] =
            localStorage.getItem("token");
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form
        onSubmit={logIn}
        className="mt-10 flex w-auto items-center max-w-[35rem] gap-7 flex-wrap justify-center gap-x-11"
      >
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

        <Button title="Log In"></Button>
      </form>
      <h6
        className="font-light text-[13.5px] mt-6"
        onClick={() => navigate("/")}
      >
        Create an account?{" "}
        <span className="underline cursor-pointer">Sign Up</span>
      </h6>
      <br />
      {popupMessage && (
        <PopupComponent
          message={popupMessage}
          onCancelPopup={() => setPopupMessage("")}
        />
      )}
    </>
  );
}
