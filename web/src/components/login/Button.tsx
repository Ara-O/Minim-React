interface Props {
  title: string;
}

export default function Button({ title }: Props) {
  return (
    <>
      <button className="bg-minim-gray-a px-9 py-4 shadow-md text-[13px] font-light rounded-full hover:bg-minim-gray-b transition-all duration-500">
        {title}
      </button>
    </>
  );
}
