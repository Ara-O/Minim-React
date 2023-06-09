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
import AIFeatures from "../components/home/AIFeatures";
import { Note, SidebarSection, AIFeature } from "../types/@types";

export default function Home() {
  const navigate = useNavigate();
  let [allNotes, setAllNotes] = useState<Note[]>([]);
  let [noteInformation, setNoteInformation] = useState<string>("");
  let [sidebarSection, setSidebarSection] = useState<SidebarSection>("Notes");
  let [AIFeature, setAIFeature] = useState<AIFeature>("");

  let [noteData, setNoteData] = useState<Note>({
    note_title: "Physics 2100",
    note_id: generateRandomId(),
    note_snippet: "This is a note snippet. Feature incoming soon.",
    note_data: "<p>You can start taking notes here :D </p>",
    last_updated: Date.now(),
  });

  function parseNoteInformation(noteData: string): string {
    const parser = new DOMParser();
    const plainText = parser.parseFromString(noteData, "text/html")
      .documentElement.textContent;
    return plainText || "";
  }

  async function saveNote() {
    noteData.note_data = noteInformation;
    noteData.note_snippet = parseNoteInformation(noteInformation.slice(0, 96));
    noteData.last_updated = Date.now();

    try {
      await axios.post("https://minim-km35.onrender.com/api/addNote", noteData);
      await loadAllNotes();
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteNote(note_id: string) {
    try {
      await axios.get("https://minim-km35.onrender.com/api/deleteNote", {
        params: { note_id },
      });
      await loadAllNotes();
      alert("Note deleted successfully");
    } catch (err) {
      console.error(err);
    }
  }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setNoteData({ ...noteData, note_title: e.target.value });
  }

  async function loadAllNotes() {
    try {
      let notes = await axios.get(
        "https://minim-km35.onrender.com/api/loadAllNotes"
      );
      setAllNotes(notes.data.notes);
    } catch (err: any) {
      console.error(err);
      if (err.response.status === 401) {
        //If JWT is expired, clear the token and go back to signup page
        localStorage.setItem("token", "");
        navigate("/");
      }
    }
  }

  useEffect(() => {
    loadAllNotes();
  }, []);

  async function editNote(note_id: string) {
    try {
      let note = await axios.get(
        "https://minim-km35.onrender.com/api/retrieveNote",
        {
          params: { note_id },
        }
      );

      setNoteData({
        note_id: note.data.note_id,
        note_data: note.data.note_data,
        note_snippet: note.data.note_snippet,
        note_title: note.data.note_title,
        last_updated: note.data.last_updated,
      });
    } catch (err) {
      console.error(err);
    }
  }

  function addNote() {
    setNoteInformation("");
    setNoteData({
      note_title: "Add Note title",
      note_id: generateRandomId(),
      note_snippet: "This is a note snippet. Feature incoming soon.",
      note_data: "<p>You can start taking notes here :D </p>",
      last_updated: Date.now(),
    });
  }

  return (
    <>
      <main className="bg-black h-screen flex">
        {/* LEFT SECTION */}
        {sidebarSection === "Notes" ? (
          <Sidebar
            allNotes={allNotes}
            onEditNote={editNote}
            onDeleteNote={deleteNote}
            onAddNote={addNote}
          />
        ) : (
          <AIFeatures
            feature={AIFeature}
            noteInformation={noteInformation}
            returnToNotes={() => setSidebarSection("Notes")}
          />
        )}
        {/* RIGHT SECTION */}
        <section className={` sidebar w-full flex flex-col`}>
          <div className="bg-minim-gray-b h-72 w-full box-border px-20 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="flex items-start gap-4">
                <img src={PencilIcon} alt="Pencil icon" className="w-4 mt-2" />
                <input
                  type="text"
                  onChange={handleTitleChange}
                  value={noteData.note_title}
                  className="bg-transparent outline-none border-0 border-b-white border-b-[1px] text-2xl pb-2 font-bold "
                />
              </span>
              <h3 className="ml-[32px] text-[12.5px] mt-3 text-[#9ca3a4]">
                Last Updated {noteData.last_updated}
              </h3>
            </div>
            <div className="flex gap-5">
              <Button onclick={saveNote}>Save Note</Button>
              <Button
                onclick={() => {
                  setSidebarSection("AI");
                  setAIFeature("Generate Idea Visualization");
                }}
              >
                Generate idea visualization
              </Button>
              {/* <Button
                onclick={() => {
                  setSidebarSection("AI");
                  setAIFeature("Speak Notes");
                }}
              >
                Speak notes
              </Button> */}
              <Button
                onclick={() => {
                  setSidebarSection("AI");
                  setAIFeature("Generate Test Questions");
                }}
              >
                Generate test questions
              </Button>
              <Button
                onclick={() => {
                  setSidebarSection("AI");
                  setAIFeature("Summarize Notes");
                }}
              >
                Summarize notes
              </Button>
            </div>
          </div>
          <div className="bg-black h-full overflow-auto w-full notes-area px-20 py-12">
            <CKEditor
              editor={BalloonEditor}
              data={noteData.note_data}
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
                setNoteInformation(editor.getData());
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
