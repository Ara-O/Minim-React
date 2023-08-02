import LoginForm from "../components/login/LoginForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
export default function Signup() {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
      navigate("/home");
    }
  }, []);

  return (
    <main className="h-screen patterned-bg text-center bg-repeat bg-[length:400px_auto] bg-black">
      <section className="flex items-center h-screen justify-center flex-col flex-wrap w-auto">
        <h3 className="text-white font-bold text-3xl md:text-4xl">
          Minimalistic Notes App
        </h3>
        <div>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
