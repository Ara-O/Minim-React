interface ButtonProps {
  onclick?: () => void;
}

const Button = (props: React.PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className="bg-[#141414] rounded-[3px] px-5 shadow-sm py-4"
      onClick={props.onclick}
    >
      <h5 className="text-xs">{props.children}</h5>
    </button>
  );
};

export default Button;
