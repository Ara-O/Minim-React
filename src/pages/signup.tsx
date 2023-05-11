import SignupForm from "../components/signup/SignupForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Signup() {
  let [pageHasLoaded, setPageHasLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common["authorization"] =
        localStorage.getItem("token");
      navigate("/home");
    } else {
      setPageHasLoaded(true);
    }
  });
  return (
    <main className="h-screen patterned-bg text-center bg-repeat bg-[length:400px_auto] bg-black">
      {pageHasLoaded === false ? (
        <h2></h2>
      ) : (
        <section className="flex items-center h-screen justify-center flex-col flex-wrap w-auto">
          <h3 className="text-white font-bold text-3xl md:text-4xl">
            Minimalistic Notes App
          </h3>
          <div>
            <SignupForm />
          </div>
        </section>
      )}
    </main>
  );
}
