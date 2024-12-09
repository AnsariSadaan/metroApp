import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Logout from "./Logout";
import MyTickets from "./MyTickets";
import StartJourney from "./StartJourney";
import CompleteJourney from "./CompleteJourney";

const Home = () => {
  const [currentView, setCurrentView] = useState("bookTicket"); //state of dashboard

  const hanldeChangeView = (view) => setCurrentView(view);
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-lg uppercase font-bold text-center mb-7">
        metro Dashboard
      </h1>
      <div className="flex justify-between">
        <button
          className={`py-2 px-4 rounded ${
            currentView === "bookTicket"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => hanldeChangeView("bookTicket")}
        >
          Book Ticket
        </button>
        <button
          className={`py-2 px-4 rounded ${
            currentView === "viewTicket"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => hanldeChangeView("viewTicket")}
        >
          View Ticket
        </button>
        <button
          className={`py-2 px-4 rounded ${
            currentView === "startJourney"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => hanldeChangeView("startJourney")}
        >
          Start Journey
        </button>
        <button
          className={`py-2 px-4 rounded ${
            currentView === "completeJourney"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => hanldeChangeView("completeJourney")}
        >
          Complete Journey
        </button>
      </div>

      <div>
        {currentView === "bookTicket" && <Dashboard />}
        {currentView === "viewTicket" && <MyTickets />}
        {currentView === "startJourney" && <StartJourney />}
        {currentView === "completeJourney" && <CompleteJourney />}
      </div>

      <div>
        <Logout />
      </div>
    </div>
  );
};

export default Home;
