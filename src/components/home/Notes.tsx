import { Note } from "../../types/@types";

interface Props {
  note: Note;
}

const Notes = ({ note }: Props) => {
  return (
    <div className="bg-minim-gray-a w-full px-8 py-6 pb-8 box-border rounded-md">
      <h3 className="font-medium text-sm">{note.note_title}</h3>
      <h4 className="text-xs my-2 text-gray-400">
        {new Date(note.last_updated).toString().slice(0, 15)}
      </h4>
      <h4 className="leading-6 text-[12.7px] font-light">
        {note.note_snippet}...
      </h4>
    </div>
  );
};

export default Notes;
