import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Note, SidebarSection, AIFeature } from "../types/types";
import Sidebar from "../components/home/Sidebar";
import generateRandomId from "../utils/generateRandomID";
import axios from "axios";
import AIFeatures from "../components/home/AIFeatures";
import MainSection from "../components/home/MainSection"

export default function Home() {
  const navigate = useNavigate();

  //Variables
  let [allNotes, setAllNotes] = useState<Note[]>([]);
  let [sidebarSection, setSidebarSection] = useState<SidebarSection>("Notes");
  let [AIFeature, setAIFeature] = useState<AIFeature>("");

  let [noteData, setNoteData] = useState<Note>({
    note_title: "Note Title",
    note_id: generateRandomId(),
    note_snippet: "This is a note snippet.",
    note_data: "<p>You can start taking notes here :D </p>",
    last_updated: Date.now(),
  });

  async function deleteNote(note_id: string) {
    try {
      await axios.post("https://minim-3py4.onrender.com/api/deleteNote", { note_id });
      await loadAllNotes();
      setNoteData({
        note_title: "Note Title",
        note_id: generateRandomId(),
        note_snippet: "This is a note snippet.",
        note_data: "<p>You can start taking notes here :D </p>",
        last_updated: Date.now(),
      })

      noteData.note_title = "Note Title"
      noteData.note_id = generateRandomId()
      noteData.note_snippet = "This is a note snippet."
      noteData.note_data = "<p>You can start taking notes here :D </p>"
      noteData.last_updated = Date.now()

    } catch (err: any) {
      alert(err?.respone?.message || "Error");
    }
  }


  async function loadAllNotes() {
    try {
      let notes = await axios.get(
        "https://minim-3py4.onrender.com/api/loadNotes"
      );
      console.log("Notes:", notes)
      if (notes.data != null) {
        setAllNotes(notes.data);
      }
    } catch (err: any) {
      console.log(err)
      if (err.code === "ERR_NETWORK") {
        alert("Network error")
      } else {
        alert(err.response.data)
      }
    }
  }

  async function saveNote() {
    try {
      await axios.post("https://minim-3py4.onrender.com/api/saveNote", noteData);
      setNoteData({ ...noteData, last_updated: Date.now() })
      await loadAllNotes();
    } catch (err: any) {
      alert(err.response.data);
    }
  }

  async function editNote(note_id: string) {
    let note = allNotes.find((note) => note.note_id === note_id)

    if (note != undefined) {
      setNoteData(note)
      noteData.note_title = note.note_title
      noteData.note_id = note.note_id
      noteData.note_snippet = note.note_snippet
      noteData.note_data = note.note_data
      noteData.last_updated = Date.now()
    }
  }

  function addNote() {
    setNoteData({
      note_title: "Note Title",
      note_id: generateRandomId(),
      note_snippet: "This is a note snippet :)",
      note_data: "<p>You can start taking notes here :D </p>",
      last_updated: Date.now(),
    });

    noteData.note_title = "Note Title"
    noteData.note_id = generateRandomId()
    noteData.note_snippet = "This is a note snippet :)"
    noteData.note_data = "<p>You can start taking notes here :D </p>"
    noteData.last_updated = Date.now()
  }

  useEffect(() => {
    if (localStorage.getItem("token")?.trim() === "" || localStorage.getItem("token") === null) {
      navigate("/")
    } else {
      loadAllNotes()
    }
  }, []);


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
            noteData={noteData.note_data}
            returnToNotes={() => setSidebarSection("Notes")}
          />
        )}
        {/* RIGHT SECTION */}
        <MainSection noteData={noteData} setNoteData={setNoteData} saveNote={saveNote} setSidebarSection={setSidebarSection} setAIFeature={setAIFeature} />
      </main>
    </>
  );
}
