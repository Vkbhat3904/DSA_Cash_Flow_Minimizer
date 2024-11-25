import React, { useState } from "react";
import TransactionInputTable from "./Components/TransactionInputTable";
import CashFlowMinimizer from "./Components/CashFlowMinimizer";
import GraphVisualization from "./Components/GraphVisualization";
import { Container, Typography, Paper, Button } from "@mui/material";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [minimizedFlow, setMinimizedFlow] = useState([]);
  const [isMinimizedFlowCalculated, setIsMinimizedFlowCalculated] =
    useState(false); // Track if the minimized flow is calculated

  const [isContentVisible, setIsContentVisible] = useState(false); // State to toggle visibility of the content

  const handleTransactionUpdate = (updatedTransactions) => {
    setTransactions(updatedTransactions);
  };

  const handleMinimizedFlowUpdate = (optimizedTransactions) => {
    setMinimizedFlow(optimizedTransactions);
    setIsMinimizedFlowCalculated(true); // Set to true when minimized flow is calculated
  };

  return (
    <Container>
      {/* Header Section - Clickable */}
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        style={{
          marginTop: "40px",
          color: "#d3d3d3", // Light grey color for the header
          fontFamily: "Roboto, sans-serif",
          fontWeight: "700", // Bold for emphasis
          fontSize: "48px", // Large font size for a strong presence
          letterSpacing: "1px", // Adding some letter spacing for clarity
          textTransform: "uppercase", // Uppercase for consistency
          animation: "headerGlow 2s ease-in-out infinite", // Animation for glowing effect
          textShadow: "0 0 8px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)", // Subtle glow
          cursor: "pointer",
        }}
        onClick={() => setIsContentVisible(!isContentVisible)} // Toggle visibility on click
      >
        Cash Flow Minimizer
      </Typography>

      {/* Step 1: Enter Transactions */}
      {isContentVisible && (
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            backgroundColor: "#ecf0f1", // Light background for visibility
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{
              color: "#16a085", // Teal color for Step 1, contrasting well
              fontSize: "30px", // Consistent size
              fontFamily: "Roboto, sans-serif",
              fontWeight: "600",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            Step 1: Enter Transactions
          </Typography>
          <TransactionInputTable onUpdate={handleTransactionUpdate} />
        </Paper>
      )}

      {/* Step 2: Minimized Cash Flow */}
      {isContentVisible && (
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            backgroundColor: "#ecf0f1", // Light background for visibility
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{
              color: "#f39c12", // Golden yellow color for Step 2
              fontSize: "30px",
              fontFamily: "Roboto, sans-serif",
              fontWeight: "600",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            Step 2: Minimized Cash Flow
          </Typography>
          <CashFlowMinimizer
            transactions={transactions}
            onMinimizedFlow={handleMinimizedFlowUpdate}
          />
        </Paper>
      )}

      {/* Step 3: Cash Flow Visualization */}
      {isContentVisible && (
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            backgroundColor: "#ecf0f1", // Light background for visibility
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{
              color: "#e74c3c", // Crimson red for Step 3 to stand out
              fontSize: "30px",
              fontFamily: "Roboto, sans-serif",
              fontWeight: "600",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            Step 3: Cash Flow Visualization
          </Typography>
          {/* Only show the GraphVisualization if the minimized flow is calculated */}
          {isMinimizedFlowCalculated && (
            <GraphVisualization minimizedFlow={minimizedFlow} />
          )}
        </Paper>
      )}
    </Container>
  );
}

export default App;
