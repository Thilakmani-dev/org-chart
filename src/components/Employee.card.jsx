import PropTypes from "prop-types";
function EmployeeCard(props) {
  const { name, designation, profileImg, isActive, teamName } = props;

  function onDragStartHandler(e) {
    console.log("drag start", e);
    e.target.classList.add("dragging");
  }

  function onDragEndHandler(e) {
    console.log("drag end", e);
    e.target.classList.remove("dragging");
  }

  return (
    <div
      className={`card ${isActive && "active"}`}
      draggable
      onDragStart={onDragStartHandler}
      onDragEnd={onDragEndHandler}
    >
      <img src={profileImg} className="cardImg" alt={name} draggable={false} />
      <div>
        <p className="userName">{name}</p>
        <p className="designation">{designation}</p>
        <p className="teamName">{teamName}</p>
      </div>
    </div>
  );
}

export default EmployeeCard;

EmployeeCard.propTypes = {
  name: PropTypes.string,
  designation: PropTypes.string,
  profileImg: PropTypes.string,
  isActive: PropTypes.bool,
  teamName: PropTypes.string,
};
