import { useState } from "react";
import MinimizeIcon from "../../assets/minimize-icon.png";
import SearchIcon from "../../assets/magnifying-glass-icon.png";
import Notes from "../../components/home/Notes";
import { Note } from "../../types/types";
import { useNavigate } from "react-router-dom";

interface Props {
  allNotes: Note[];
  onEditNote: any;
  onAddNote: any;
  onDeleteNote: any;
}


const Sidebar = ({ allNotes, onEditNote, onDeleteNote, onAddNote }: Props) => {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState("")
  const filteredNotes = allNotes.filter((note) => note.note_title.toLowerCase().includes(searchInput.toLowerCase().trim()))
  function handleSearchBarChange(e) {
    setSearchInput(e.target.value)
  }

  function editNote(note_id: string) {
    console.log("editing note", note_id);
    onEditNote(note_id);
  }

  function logOut() {
    localStorage.setItem("token", "")
    navigate("/")
  }

  function deleteNote(note_id: string) {
    console.log("deleting note", note_id);
    onDeleteNote(note_id);
  }
  let [sideBarMinimized, setSideBarMinimized] = useState<boolean>(false);
  return (
    <section
      className={`${sideBarMinimized === true ? "sidebar-slide sidebar-minimized" : ""
        } sidebar relative w-[600px] patterned-bg bg-black h-screen px-14 py-20`}
    >
      <img
        src={MinimizeIcon}
        onClick={() => setSideBarMinimized(!sideBarMinimized)}
        alt="Minimize icon"
        className="absolute top-10 right-6 cursor-pointer w-[17px]"
      />
      <div
        className={`${sideBarMinimized === true ? "sidebar-text-disappear" : ""
          } sidebar-notes`}
      >
        <h3 className="font-medium text-[17px]">Hello there</h3>
        <h4 className="mt-3 text-gray-300 font-medium text-[13px]">
          August 3, 2022
        </h4>
        <span className="relative">
          <input
            type="text"
            value={searchInput}
            className="mt-5 rounded-[5px] outline-none pl-6 text-sm bg-minim-gray-a h-10 w-80"
            onChange={handleSearchBarChange}
          />
          <img
            src={SearchIcon}
            alt="Magnifying glass icon"
            className="w-6 absolute top-[1px] right-3 opacity-50 cursor-pointer"
          />
        </span>
        <h4
          className="mt-5 text-gray-300 font-medium text-[13px] underline cursor-pointer"
          onClick={onAddNote}
        >
          Add Note
        </h4>
        <div className="mt-5 flex flex-col gap-5 sidebar-notes-list">
          {filteredNotes.map((note) => {
            return (
              <Notes
                note={note}
                key={note.note_id}
                editNote={() => editNote(note.note_id)}
                deleteNote={() => deleteNote(note.note_id)}
              />
            );
          })}
        </div>
        <h3 onClick={logOut} className="absolute cursor-pointer text-sm bottom-10 hover:underline font-light">Log Out</h3>
      </div>
    </section>
  );
};

export default Sidebar;
