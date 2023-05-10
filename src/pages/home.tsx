import PencilIcon from "../assets/pencil-icon.png";
import Sidebar from "../components/home/Sidebar";

export default function Home() {
  return (
    <>
      <main className="bg-black h-screen flex">
        {/* LEFT SECTION */}
        <Sidebar />
        {/* RIGHT SECTION */}
        <section className={` sidebar w-full flex flex-col`}>
          <div className="bg-minim-gray-b h-72 w-full  box-border px-20 flex items-center ">
            <div className="flex flex-col">
              <span className="flex items-start gap-4">
                <img src={PencilIcon} alt="Pencil icon" className="w-4 mt-2" />
                <input
                  type="text"
                  value="Physics 2100"
                  className="bg-transparent outline-none border-0 border-b-white border-b-[1px] text-2xl pb-2 font-medium "
                />
              </span>
              <h3 className="ml-[32px] text-[12.5px] mt-3 text-[#9ca3a4]">
                Last Updated 2/23/2022
              </h3>
            </div>
          </div>
          <div className="bg-black h-full w-full">
            <h3>hi</h3>
          </div>
        </section>
      </main>
    </>
  );
}
