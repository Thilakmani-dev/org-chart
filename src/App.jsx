import "./App.css";
import Sidebar from "./components/Sidebar";
import OrgChart from "./components/Org.chart";
import { createContext, useEffect, useState } from "react";
import { TEAM_NAMES } from "./constant";

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
    if (selectedValue.id === 3000) {
      setFilteredOrgResults(orgData);
      return;
    }
    setFilteredOrgResults({
      ...orgData,
      children: [
        orgData.children.find((child) => child.id === selectedValue.id),
      ],
    });
  }

  function changSelectedEmployee(employee) {
    setSelectedEmployee(employee);
  }

  function updatedOrgData(updatedData) {
    setOrgData((prev) => ({ ...prev, updatedData }));
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
          updatedOrgData,
        }}
      >
        <Sidebar />
        <OrgChart />
      </OrgContext.Provider>
    </main>
  );
}

export default App;
