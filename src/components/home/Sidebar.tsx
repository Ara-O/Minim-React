import { useState } from "react";
import MinimizeIcon from "../../assets/minimize-icon.png";
import Notes from "../../components/home/Notes";

const Sidebar = () => {
  let [sideBarMinimized, setSideBarMinimized] = useState<boolean>(false);
  return (
    <section
      className={`${
        sideBarMinimized === true ? "sidebar-slide sidebar-minimized" : ""
      } sidebar relative w-[600px] patterned-bg bg-black h-screen px-14 py-20`}
    >
      <img
        src={MinimizeIcon}
        onClick={() => setSideBarMinimized(!sideBarMinimized)}
        alt="Minimize icon"
        className="absolute top-10 right-6 cursor-pointer w-[17px]"
      />
      <div
        className={`${
          sideBarMinimized === true ? "sidebar-text-disappear" : ""
        }`}
      >
        <h3 className="font-medium text-[17px]">Welcome Ara</h3>
        <h4 className="mt-3 text-gray-300 font-medium text-[13px]">
          August 3, 2022
        </h4>
        <span>
          <input
            type="text"
            className="mt-5 rounded-[5px] outline-none pl-6 text-sm bg-minim-gray-a h-10 w-80"
          />
        </span>
        <div className="mt-5 flex flex-col gap-5">
          <Notes />
          <Notes />
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
