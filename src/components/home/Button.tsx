interface ButtonProps {
  onclick?: () => void;
}

const Button = (props: React.PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className="bg-[#363636] rounded-full px-5 shadow-sm py-3"
      onClick={props.onclick}
    >
      <h5 className="text-xs">{props.children}</h5>
    </button>
  );
};

export default Button;
