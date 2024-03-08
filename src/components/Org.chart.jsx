import PropTypes from "prop-types";
import EmployeeCard from "./Employee.card";
import { useContext, useEffect, useRef } from "react";
import { OrgContext } from "../App";

import { moveObjectByIdToTeam } from "../utils";

const OrgChart = () => {
  const { orgData, selectedTeam } = useContext(OrgContext);
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
  const { selectedEmployee, orgData, updatedOrgData } = useContext(OrgContext);
  const { name, designation, children, profileImg, id } = data;

  const zoneRef = useRef(null);

  useEffect(function attachEventListeners() {
    const draggables = document.querySelectorAll(".draggable");
    const droppables = document.querySelectorAll(".droppable");

    function dragOverHandler(e, zone) {
      e.preventDefault();
      zoneRef.current = zone.id;
    }

    draggables.forEach((draggableElement) => {
      draggableElement.addEventListener("dragstart", () => {
        draggableElement.classList.add("isDragging");
      });
      draggableElement.addEventListener("dragend", () => {
        draggableElement.classList.remove("isDragging");
      });
    });

    droppables.forEach((zone) => {
      zone.addEventListener("dragover", (e) => dragOverHandler(e, zone));
      zone.addEventListener("dragenter", (e) => dragOverHandler(e, zone));
    });

    return () => {
      draggables.forEach((draggableElement) => {
        draggableElement.removeEventListener("dragstart", () => {
          draggableElement.classList.add("isDragging");
        });
        draggableElement.removeEventListener("dragend", () => {
          draggableElement.classList.remove("isDragging");
        });
      });

      droppables.forEach((zone) => {
        zone.removeEventListener("dragover", (event) =>
          dragOverHandler(event, zone)
        );
        zone.removeEventListener("dragenter", (event) =>
          dragOverHandler(event, zone)
        );
      });
    };
  }, []);

  function dropHandler(e) {
    e.preventDefault();
    const isDraggingElement = document.querySelector(".isDragging");
    const updatedData = moveObjectByIdToTeam(
      parseInt(isDraggingElement.id),
      parseInt(zoneRef.current),
      orgData
    );
    if (updatedData) updatedOrgData(updatedData);
  }

  return (
    <li
      id={id}
      className={designation === "Manager" ? "droppable" : undefined}
      onDrop={dropHandler}
    >
      <EmployeeCard
        name={name}
        designation={designation}
        profileImg={profileImg}
        isActive={selectedEmployee.id === id}
        id={id}
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
