import Input from "./Input";
import { ChangeEvent, useState, FormEvent } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type UserData = {
  email: string;
  password: string;
};


export default function LoginForm() {
  const navigate = useNavigate();
  let [errorMessage, setErrorMessage] = useState<string>("")
  let [progressMessage, setProgressMessage] = useState<string>("")
  let [userData, setUserData] = useState<UserData>({
    email: "test@gmail.com",
    password: "test",
  });

  function logIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setProgressMessage("Logging in...")
    setErrorMessage("")
    axios
      .post("http://localhost:8080/api/login", userData)
      .then((res) => {
        console.log(res)
        localStorage.setItem("token", res.data);
        axios.defaults.headers.common["authorization"] =
          localStorage.getItem("token");
        navigate("/home");
      })
      .catch((err) => {
        setProgressMessage("")
        setErrorMessage(err.response.data)
      });
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
        <div className="flex gap-12 flex-wrap items-center justify-center">

          <Input
            name="email"
            label="Email Address"
            type="email"
            onChange={handleChange}
            value={userData.email}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            value={userData.password}
          />
        </div>

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
      <h6 className="font-light text-red-400 text-sm">{errorMessage}</h6>
      <h6 className="font-light text-white-400 text-sm">{progressMessage}</h6>
    </>
  );
}
