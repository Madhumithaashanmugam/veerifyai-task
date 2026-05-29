interface ReviewerHeaderProps {
  reviewer: {
    name: string;
    role: string;
    location?: string;
  };
}

const ReviewerHeader = ({ reviewer }: ReviewerHeaderProps) => {
  return (
    <div className="reviewer-header">
      <div>
        <p className="eyebrow">Reviewer dashboard</p>
        <h1>Review claims with compliance insights</h1>
      </div>

      <div className="reviewer-profile">
        <p>{reviewer.role}</p>
        <strong>{reviewer.name}</strong>
        {reviewer.location && <small>{reviewer.location}</small>}
      </div>
    </div>
  );
};

export default ReviewerHeader;
