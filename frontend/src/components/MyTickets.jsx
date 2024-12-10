import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQrcode from "react-qr-code";
import html2canvas from "html2canvas";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const handleDownloadTicket = (ticket) => {
    const ticketElement = document.getElementById(ticket);
    if (!ticketElement) {
      console.error("Ticket element not found");
      return;
    }
    // Hide the download button
    const downloadButton = ticketElement.querySelector("button");
    downloadButton.style.display = "none";

    html2canvas(ticketElement)
      .then((canvas) => {
        // Show the download button again
        downloadButton.style.display = "block";
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = `ticket-${ticket.ticketToken}.png`;
        link.click();
      })
      .catch((error) => {
        // Show the download button again
        downloadButton.style.display = "block";
        console.error("Error capturing ticket element:", error);
      });
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          // "http://192.168.0.156:3000/api/my-ticket",
          "http://localhost:3000/api/my-ticket",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.data.tickets) {
          setTickets(response.data.tickets);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch tickets");
      }
    };

    fetchTickets();
  }, [navigate]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">My Booked Tickets</h1>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-500">You have no booked tickets.</p>
      ) : (
        <div>
          {tickets.map((ticket, i) => (
            <div key={ticket.ticketToken} id={i} className="mb-4">
              <div className="flex flex-wrap lg:flex-nowrap items-center p-4 border-l-4 border-indigo-400 bg-gray-100 rounded-lg shadow-sm">
                {/* Ticket Details */}
                <div className="w-full lg:w-2/3 pr-4">
                  <h2 className="text-lg font-semibold mb-2">
                    {ticket.source} → {ticket.destination}
                  </h2>
                  {ticket.via && (
                    <p className="text-gray-500">Via: {ticket.via}</p>
                  )}
                  <p className="text-gray-600">Price: ₹{ticket.price}</p>
                  <p className="text-gray-500">
                    Ticket Token: {ticket.ticketToken}
                  </p>
                  <p className="text-gray-500">Status: {ticket.status}</p>
                  <p className="text-sm text-gray-400">
                    Issued Time:{" "}
                    {new Date(ticket.issuedAt).toLocaleTimeString()}
                  </p>
                  <p className="text-sm text-gray-400">
                    Expire Time:{" "}
                    {new Date(ticket.expiredAt).toLocaleTimeString()}
                  </p>
                </div>

                {/* QR Code and Download Button */}
                <div className="w-full lg:w-1/3 flex flex-col items-center">
                  <ReactQrcode
                    className="w-24 mt-2 h-24 md:w-30 md:h-32 lg:w-40 lg:h-40"
                    value={JSON.stringify(ticket)}
                  />
                  <button
                    onClick={() => handleDownloadTicket(i)}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
