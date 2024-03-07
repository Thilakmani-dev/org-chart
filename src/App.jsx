import "./App.css";
import Sidebar from "./components/Sidebar";
import OrgChart from "./components/Org.chart";
import { createContext, useEffect, useState } from "react";
import { TEAM_NAMES } from "./constant";
import { findObjectById } from "./utils";

export const OrgContext = createContext(null);

function App() {
  const [orgData, setOrgData] = useState(null);
  const [filteredOrgResults, setFilteredOrgResults] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(TEAM_NAMES[0]);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  async function getOrgData() {
    let response = await fetch("/org/api/org");
    let data = await response.json();
    setOrgData(data.org);
    setFilteredOrgResults(data.org);
  }

  function handleTeamChange(selectedValue) {
    //deactive employee on team change
    setSelectedEmployee({});
    setSelectedTeam(selectedValue);
    console.log(
      "team change",
      selectedValue.id,
      findObjectById(selectedValue.id, orgData)
    );
    let updatedOrgData = findObjectById(selectedValue.id, orgData);
    if (updatedOrgData) {
      setFilteredOrgResults(updatedOrgData);
    }
  }

  function changSelectedEmployee(employee) {
    setSelectedEmployee(employee);
  }

  useEffect(function () {
    getOrgData();
  }, []);

  return (
    <main className="main">
      <OrgContext.Provider
        value={{
          orgData: filteredOrgResults,
          selectedTeam,
          handleTeamChange,
          selectedEmployee,
          changSelectedEmployee,
        }}
      >
        <Sidebar />
        <OrgChart />
      </OrgContext.Provider>
    </main>
  );
}

export default App;
