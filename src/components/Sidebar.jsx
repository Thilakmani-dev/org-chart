import { useContext, useEffect, useState } from "react";
import { IoIosArrowDropdownCircle, IoIosSearch } from "react-icons/io";

import { TEAM_NAMES } from "../constant";
import { OrgContext } from "../App";
import EmployeeCard from "./Employee.card";

const Sidebar = () => {
  const { selectedTeam, handleTeamChange, changSelectedEmployee } =
    useContext(OrgContext);

  const [filteredEmployees, setFilteredEmployees] = useState([]);

  async function handleChange(e) {
    const searchedValue = e.target.value.toLowerCase();
    // if (searchedValue) {
    const employeesData = await getEmployees();
    const filteredData = employeesData.employees.filter((employee) => {
      if (selectedTeam.name === "All")
        return employee.name.toLowerCase().includes(searchedValue);
      return (
        employee.name.toLowerCase().includes(searchedValue) &&
        employee.teamName === selectedTeam.name
      );
    });
    console.log("filtered", filteredData);
    setFilteredEmployees(filteredData);
    // } else {
    //   setFilteredEmployees([]);
    // }
  }

  async function getEmployees() {
    let response = await fetch("/org/api/employees");
    let data = await response.json();
    return data;
  }

  function openEmployeeDetail(employee) {
    changSelectedEmployee(employee);
  }

  function toggleTeamListVisibility() {
    const list = document.getElementById("teams");
    list.classList.toggle("open");
  }

  function closeTeamList() {
    const list = document.getElementById("teams");
    list.classList.remove("open");
  }

  function applyDebounce(func, delay) {
    let context = this;
    let timer;
    return function (...args) {
      if (timer) clearInterval(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  const debouncedOnChangeHandler = applyDebounce(handleChange, 500);

  useEffect(function loadAllEmployees() {
    getEmployees().then((employeesData) => {
      if (employeesData.employees && employeesData.employees.length > 0)
        setFilteredEmployees(employeesData.employees);
    });
  }, []);

  return (
    <section className="sidebar">
      <div className="searchBar">
        <div className="searchIcon">
          <IoIosSearch />
        </div>
        <input
          type="text"
          placeholder="Search employee"
          onChange={debouncedOnChangeHandler}
          onFocus={closeTeamList}
        />
        <div id="select" onClick={toggleTeamListVisibility}>
          <IoIosArrowDropdownCircle />
          <ul id="teams">
            {TEAM_NAMES.map((teamName) => (
              <li
                key={teamName.id}
                className={`options ${
                  teamName.id === selectedTeam.id ? "activeOption" : ""
                }`}
                onClick={() => handleTeamChange(teamName)}
              >
                {teamName.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {filteredEmployees.length > 0 ? (
        filteredEmployees.map((employee) => {
          let { name, id, teamName, profileImg, designation } = employee;
          return (
            <div
              key={employee.id}
              // className="employeeListItem"
              onClick={() => openEmployeeDetail(employee)}
            >
              <EmployeeCard
                name={name}
                id={id}
                teamName={teamName}
                profileImg={profileImg}
                designation={designation}
              />
            </div>
          );
        })
      ) : (
        <p className="notFound">No Employees found</p>
      )}
    </section>
  );
};

export default Sidebar;
