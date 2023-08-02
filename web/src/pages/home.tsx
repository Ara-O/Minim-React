import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Note, SidebarSection, AIFeature } from "../types/types";
import Sidebar from "../components/home/Sidebar";
import generateRandomId from "../utils/generateRandomID";
import axios from "axios";
import AIFeatures from "../components/home/AIFeatures";
import MainSection from "../components/home/MainSection"
import parseNoteInformation from "../utils/parseNoteInformation";

export default function Home() {
  const navigate = useNavigate();

  //Variables
  let [allNotes, setAllNotes] = useState<Note[]>([]);
  let [noteInformation, setNoteInformation] = useState<string>("");
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
      await axios.get("http://localhost:8080/api/deleteNote", {
        params: { note_id },
      });
      await loadAllNotes();
      alert("Note deleted successfully");
    } catch (err) {
      console.error(err);
    }
  }


  async function loadAllNotes() {
    try {
      let notes = await axios.get(
        "http://localhost:8080/api/loadAllNotes"
      );
      setAllNotes(notes.data.notes);
    } catch (err: any) {
      console.error(err);
      if (err.response.status === 401) {
        //If JWT is expired, clear the token and go back to signup page
        localStorage.setItem("token", "");
        navigate("/");
      } else {
        alert(err)
      }
    }
  }

  async function saveNote() {
    console.log(noteData)
    try {
      await axios.post("http://localhost:8080/api/saveNote", noteData);
      // await loadAllNotes();
    } catch (err: any) {
      alert(err.response.data);
    }
  }

  async function editNote(note_id: string) {
    try {
      let note = await axios.get(
        "http://localhost:8080/api/retrieveNote",
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
      note_title: "Note title",
      note_id: generateRandomId(),
      note_snippet: "This is a note snippet. Feature incoming soon.",
      note_data: "<p>You can start taking notes here :D </p>",
      last_updated: Date.now(),
    });
  }

  useEffect(() => {
    loadAllNotes();
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
            noteInformation={noteInformation}
            returnToNotes={() => setSidebarSection("Notes")}
          />
        )}
        {/* RIGHT SECTION */}
        <MainSection noteData={noteData} setNoteData={setNoteData} saveNote={saveNote} setSidebarSection={setSidebarSection} setNoteInformation={setNoteInformation} setAIFeature={setAIFeature} />
      </main>
    </>
  );
}
