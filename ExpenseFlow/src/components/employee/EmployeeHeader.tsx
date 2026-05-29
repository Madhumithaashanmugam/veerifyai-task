const EmployeeHeader = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="brand">Atlas Compliance</div>
        <span>/</span>
        <p>Employee</p>
      </div>

      <div className="topbar-right">
        {/* <p>Alice Chen</p> */}
        <span>•</span>
        <p>E-001</p>
        <button className="switch-btn">Switch role</button>
      </div>
    </div>
  );
};

export default EmployeeHeader;
