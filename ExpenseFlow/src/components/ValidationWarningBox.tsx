interface ValidationWarningBoxProps {
  message: string;
}

const ValidationWarningBox = ({ message }: ValidationWarningBoxProps) => {
  return (
    <div className="validation-warning-box">
      <p>{message}</p>
    </div>
  );
};

export default ValidationWarningBox;
