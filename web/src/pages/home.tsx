import Sidebar from "../components/home/Sidebar";
import { ChangeEvent, useState } from "react";
import generateRandomId from "../utils/generateRandomID";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AIFeatures from "../components/home/AIFeatures";
import MainSection from "../components/home/MainSection"
import { Note, SidebarSection, AIFeature } from "../types/types";

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
        <MainSection noteData={noteData} setSidebarSection={setSidebarSection} setAIFeature={setAIFeature} />
      </main>
    </>
  );
}
