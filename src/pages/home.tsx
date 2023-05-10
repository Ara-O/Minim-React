import PencilIcon from "../assets/pencil-icon.png";
import Sidebar from "../components/home/Sidebar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";
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
          <div className="bg-black h-full w-full notes-area">
            <CKEditor
              editor={BalloonEditor}
              data="<p>Hello from CKEditor 5!</p>"
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
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
