interface Props {
  message: string;
  onCancelPopup: any;
}

export default function ErrorComponent({ message, onCancelPopup }: Props) {
  console.log("coponent initialized");

  return (
    <>
      {
        <div className="absolute bottom-12 right-12 bg-minim-gray-a px-14 py-7 pl-10 rounded-md flex items-start flex-col w-80 max-w-80 transition-all duration-500s">
          <img
            src="../../src/assets/icons/cancel-icon.png"
            alt="Cancel icon"
            onClick={onCancelPopup}
            className="w-5 absolute right-7 cursor-pointer"
          />
          <h3 className="font-medium text-sm">ERROR</h3>
          <div className="h-0.5 rounded-lg my-4 bg-[#686868] w-48"></div>
          <h5 className="font-extralight text-xs text-left leading-5 mt-2">
            {message}
          </h5>
        </div>
      }
    </>
  );
}
