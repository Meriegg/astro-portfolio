interface Props {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
}

const OpenTerminal = ({ isOpen, setOpen }: Props) => {
  return <button onClick={() => setOpen(!isOpen)}>open terminal</button>;
};

export default OpenTerminal;
