interface FinalizeButtonProps {
  disabled?: boolean;
  onFinalize: () => void;
}

const FinalizeButton = ({ disabled, onFinalize }: FinalizeButtonProps) => {
  return (
    <button className="finalize-button" disabled={disabled} onClick={onFinalize}>
      Finalize claim
    </button>
  );
};

export default FinalizeButton;
