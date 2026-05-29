interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return <div className="controller-empty-state">{message}</div>;
};

export default EmptyState;
