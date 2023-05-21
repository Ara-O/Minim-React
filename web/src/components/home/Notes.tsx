import { Note } from "../../types/@types";
import PencilIcon from "../../assets/pencil-icon.png";
import TrashIcon from "../../assets/trash-icon.png";
interface Props {
  note: Note;
  editNote: React.MouseEventHandler;
  deleteNote: React.MouseEventHandler;
}

const Notes = ({ note, editNote, deleteNote }: Props) => {
  return (
    <div className="bg-minim-gray-a w-full px-8 py-6 pb-8 box-border rounded-md">
      <h3 className="font-medium text-sm">{note.note_title}</h3>
      <h4 className="text-xs my-2 text-gray-400">
        {new Date(note.last_updated).toString().slice(0, 15)}
      </h4>
      <h4 className="leading-6 text-[12.7px] font-light">
        {note.note_snippet}...
      </h4>
      <span className="flex justify-end gap-5 items-center mt-3">
        <img
          src={PencilIcon}
          alt="Edit note"
          className="w-3 cursor-pointer"
          onClick={editNote}
        />
        <img
          src={TrashIcon}
          alt="Delete note"
          className="w-3 cursor-pointer"
          onClick={deleteNote}
        />
      </span>
    </div>
  );
};

export default Notes;
