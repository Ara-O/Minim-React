import SignupForm from "../components/signup/SignupForm";

export default function Signup() {
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
