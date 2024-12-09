import { v4 as uuidv4 } from "uuid";
import { Ticket } from "../models/ticket.model.js";
import { metroData } from "../helper/metroData.js";

const buyTicket = async (req, res) => {
  const { source, destination } = req.body;
  const userId = req.user ? req.user._id : null;

  if (!source || !destination) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: source, destination",
    });
  }

  try {
    const sourceLine = metroData.lines.find((line) =>
      line.stations.includes(source)
    );
    const destinationLine = metroData.lines.find((line) =>
      line.stations.includes(destination)
    );

    if (!sourceLine || !destinationLine) {
      return res.status(400).json({
        success: false,
        message: "Invalid Source and Destination",
      });
    }

    let viaStation = null;
    let totalDistance = 0;

    if (sourceLine.line !== destinationLine.line) {
      // Find common stations for interchange
      const commonStations = sourceLine.stations.filter((station) =>
        destinationLine.stations.includes(station)
      );

      if (commonStations.length === 0) {
        return res.status(400).json({
          success: false,
          message:
            "No valid interchange station exists between the selected lines.",
        });
      }
      // Select the first common station as the via
      viaStation = commonStations[0];
      // Calculate distance
      const sourceIndex = sourceLine.stations.indexOf(source);
      const viaIndexSource = sourceLine.stations.indexOf(viaStation);
      const viaIndexDestination = destinationLine.stations.indexOf(viaStation);
      const destinationIndex = destinationLine.stations.indexOf(destination);
      
      totalDistance =
        Math.abs(viaIndexSource - sourceIndex) +
        Math.abs(destinationIndex - viaIndexDestination);
    } else {
      // Same line journey
      const sourceIndex = sourceLine.stations.indexOf(source);
      const destinationIndex = sourceLine.stations.indexOf(destination);
      totalDistance = Math.abs(destinationIndex - sourceIndex);
    }

    // Calculate price (e.g., ₹10 per station)
    const price = totalDistance * 10;

    // Create ticket object
    const ticket = new Ticket({
      userId,
      ticketToken: uuidv4(),
      source,
      destination,
      via: viaStation ? [viaStation] : [],
      price,
      issuedAt: new Date(),
      expiredAt: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1-hour validity
    });

    // Save ticket to database
    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Ticket Purchased Successfully",
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Purchasing Ticket",
      error: error.message,
    });
  }
};

export default buyTicket;