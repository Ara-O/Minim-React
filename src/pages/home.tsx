import PencilIcon from "../assets/pencil-icon.png";
import Sidebar from "../components/home/Sidebar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";
import Button from "../components/home/Button";
import { ChangeEvent, useState } from "react";
import generateRandomId from "../utils/generateRandomID";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Note } from "../types/@types";

export default function Home() {
  const navigate = useNavigate();
  let [noteTitle, setNoteTitle] = useState("Physics 2100");
  let [allNotes, setAllNotes] = useState<Note[]>([]);
  let [noteData, setNoteData] = useState<Note>({
    note_title: noteTitle,
    note_id: generateRandomId(),
    note_snippet: "This is a note snippet. Feature incoming soon.",
    note_data: "",
    last_updated: Date.now(),
  });

  async function saveNote() {
    console.log("saving note");
    noteData.note_title = noteTitle;
    console.log(noteData);
    try {
      let res = await axios.post("/api/addNote", noteData);
      loadAllNotes();
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setNoteTitle(e.target.value);
  }

  async function loadAllNotes() {
    try {
      let notes = await axios.get("/api/loadAllNotes");
      setAllNotes(notes.data.notes);
      console.log("notes", notes);
    } catch (err: any) {
      console.error(err);
      if (err.response.status === 401) {
        localStorage.setItem("token", "");
        navigate("/");
      }
    }
  }

  useEffect(() => {
    // do stuff here...

    loadAllNotes();
  }, []);

  return (
    <>
      <main className="bg-black h-screen flex">
        {/* LEFT SECTION */}
        <Sidebar allNotes={allNotes} />
        {/* RIGHT SECTION */}
        <section className={` sidebar w-full flex flex-col`}>
          <div className="bg-minim-gray-b h-72 w-full box-border px-20 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="flex items-start gap-4">
                <img src={PencilIcon} alt="Pencil icon" className="w-4 mt-2" />
                <input
                  type="text"
                  onChange={handleTitleChange}
                  value={noteTitle}
                  className="bg-transparent outline-none border-0 border-b-white border-b-[1px] text-2xl pb-2 font-bold "
                />
              </span>
              <h3 className="ml-[32px] text-[12.5px] mt-3 text-[#9ca3a4]">
                Last Updated 2/23/2022
              </h3>
            </div>
            <div className="flex gap-5">
              <Button onclick={saveNote}>Save Note</Button>
              <Button onclick={() => console.log("e")}>
                Generate idea visualization
              </Button>
              <Button onclick={() => console.log("e")}>Speak notes</Button>
              <Button onclick={() => console.log("e")}>
                Generate test questions
              </Button>
              <Button onclick={() => console.log("e")}>Summarize notes</Button>
            </div>
          </div>
          <div className="bg-black h-full overflow-auto w-full notes-area px-20 py-12">
            <CKEditor
              editor={BalloonEditor}
              data="<p>You can start taking notes here :D </p>"
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              config={{
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "blockQuote",
                  "bulletedList",
                  "numberedList",
                  "fontSize",
                  "link",
                  "fontFamily",
                  "undo",
                  "redo",
                ],
              }}
              onChange={(_, editor) => {
                setNoteData({
                  ...noteData,
                  note_data: editor.getData(),
                  last_updated: Date.now(),
                });
              }}
              // onBlur={(_, editor) => {}}
              onFocus={(_, editor) => {
                console.log("Focus.", editor);
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
