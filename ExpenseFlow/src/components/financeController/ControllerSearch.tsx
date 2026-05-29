interface ControllerSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const ControllerSearch = ({ search, onSearchChange }: ControllerSearchProps) => {
  return (
    <div className="controller-search">
      <input
        type="text"
        placeholder="Search claims by ID, employee, or title"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
};

export default ControllerSearch;
