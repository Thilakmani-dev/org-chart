import PropTypes from "prop-types";
import EmployeeCard from "./Employee.card";
import { useContext } from "react";
import { OrgContext } from "../App";

const OrgChart = () => {
  const { orgData, selectedTeam, selectedEmployee } = useContext(OrgContext);
  console.log("rendering", orgData, selectedTeam);

  if (!orgData) return;

  return (
    <section className="treeView">
      <ul className="treeViewChild">
        <TreeView data={orgData} />
      </ul>
    </section>
  );
};

OrgChart.propTypes = {
  orgData: PropTypes.object,
};

const TreeView = ({ data }) => {
  const { selectedEmployee } = useContext(OrgContext);
  const { name, designation, children, profileImg, id } = data;

  function onDragOverHandler(e) {
    console.info("~overing", e);
    const draggingElement = document.querySelector(".dragging");
    const droppableElement = document.querySelector(`#${id}`);
    droppableElement.appendChild(draggingElement);
  }

  return (
    <li onDragOver={onDragOverHandler} id={id}>
      <EmployeeCard
        name={name}
        designation={designation}
        profileImg={profileImg}
        isActive={selectedEmployee.id === id}
      />
      {Array.isArray(children) && children.length > 0 && (
        <ul>
          {children.map((item) => (
            <TreeView data={item} key={item.id} />
          ))}
        </ul>
      )}
    </li>
  );
};

TreeView.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default OrgChart;
