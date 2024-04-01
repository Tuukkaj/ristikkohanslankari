interface MButtonProps {
  text: string;
  onClick: () => void;
}

export default function (props: MButtonProps) {
  return (
    <div>
      <button
        onClick={props.onClick}
        className="bg-emerald-700 hover:bg-emerald-800 focus:ring focus:ring-emerald-400 click text-white font-bold py-2 px-4 rounded"
      >
        {props.text}
      </button>
    </div>
  );
}
