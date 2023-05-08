interface Props {
  title: string;
  onclick: any;
}

export default function Button({ title, onclick }: Props) {
  return (
    <>
      <button
        onClick={onclick}
        className="bg-minim-gray-a px-9 py-4 shadow-md text-[13px] font-light rounded-full hover:bg-minim-gray-b transition-all duration-500"
      >
        {title}
      </button>
    </>
  );
}
