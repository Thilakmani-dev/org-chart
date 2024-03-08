import PropTypes from "prop-types";
function EmployeeCard(props) {
  const { name, designation, profileImg, isActive, teamName, id } = props;

  return (
    <div
      className={`card ${designation !== "Manager" && "draggable"} ${
        isActive && "active"
      }`}
      draggable={designation !== "Manager"}
      id={id}
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
  id: PropTypes.number,
};
