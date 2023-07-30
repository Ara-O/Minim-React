import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";
import Button from "./Button";
import PencilIcon from "../../assets/pencil-icon.png";
import { Note } from "../../types/types";
import { ChangeEvent } from "react"

interface Props {
    noteData: Note,
    setSidebarSection: any
    setAIFeature: any
    setNoteData: any
    saveNote: any
    setNoteInformation: any
}

export default function main({ noteData, setNoteData, setSidebarSection, setAIFeature, saveNote, setNoteInformation }: Props) {
    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        setNoteData({ ...noteData, note_title: e.target.value });
    }

    return (
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
                        Last Updated: {new Date(noteData.last_updated).toLocaleString()}
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
                    // @ts-ignore
                    editor={BalloonEditor}
                    data={noteData.note_data}
                    onReady={(editor) => {
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
                        // @ts-ignore
                        setNoteInformation(editor.getData());
                    }}
                    // onBlur={(_, editor) => {}}
                    onFocus={(_, editor) => {
                        console.log("Focus.", editor);
                    }}
                />
            </div>
        </section>)
}