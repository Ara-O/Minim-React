import Notes from "../components/home/Notes";

export default function Home() {
  return (
    <>
      <main className="bg-black h-screen">
        {/* LEFT SECTION */}
        <section className="w-[550px] patterned-bg bg-black h-screen px-20 py-32">
          <h3 className="font-medium text-[22px]">Welcome Ara</h3>
          <h4 className="mt-3 text-gray-300 font-medium text-[15px]">
            August 3, 2022
          </h4>
          <span>
            <input
              type="text"
              className="mt-5 rounded-md bg-minim-gray-a h-11 w-80"
            />
          </span>
          <div className="mt-5 flex flex-col gap-5">
            <Notes />
            <Notes />
          </div>
        </section>
        {/* RIGHT SECTION */}
        <section className=" "></section>
      </main>
    </>
  );
}
