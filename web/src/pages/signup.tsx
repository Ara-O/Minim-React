import SignupForm from "../components/signup/SignupForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
      navigate("/home");
    } else {
      console.log("User isn't logged in yet")
    }
  }, []);

  return (
    <main className="h-screen patterned-bg text-center bg-repeat bg-[length:400px_auto] bg-black">
      <section className="flex items-center h-screen justify-center flex-col flex-wrap w-auto">
        <h3 className="text-white font-bold text-3xl md:text-4xl">
          Minimalistic Notes App
        </h3>
        <div>
          <SignupForm />
        </div>
      </section>
    </main>
  );
}
