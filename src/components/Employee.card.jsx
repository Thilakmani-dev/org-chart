import PropTypes from "prop-types";
import { DESIGNATION_TYPES } from "../constant";
function EmployeeCard(props) {
  const { name, designation, profileImg, isActive, teamName, id } = props;

  let isDraggable = !Object.values(DESIGNATION_TYPES).includes(designation);
  return (
    <div
      className={`card ${isDraggable && "draggable"} ${isActive && "active"}`}
      draggable={isDraggable}
      id={id}
    >
      <img src={profileImg} className="cardImg" alt={name} draggable={false} />
      <div className="cardLeftContent">
        <p className="userName">{name}</p>
        <p className="designation">{designation}</p>
        {teamName && <p className="teamName">Team: {teamName}</p>}
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
