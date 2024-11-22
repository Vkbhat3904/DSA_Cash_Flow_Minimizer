import React, { useState } from "react";
import TransactionInputTable from "./Components/TransactionInputTable";
import CashFlowMinimizer from "./Components/CashFlowMinimizer";
import GraphVisualization from "./Components/GraphVisualization";
import { Container, Typography } from "@mui/material";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [minimizedFlow, setMinimizedFlow] = useState([]);
  const [isMinimizedFlowCalculated, setIsMinimizedFlowCalculated] =
    useState(false); // Track if the minimized flow is calculated

  const handleTransactionUpdate = (updatedTransactions) => {
    setTransactions(updatedTransactions);
  };

  const handleMinimizedFlowUpdate = (optimizedTransactions) => {
    setMinimizedFlow(optimizedTransactions);
    setIsMinimizedFlowCalculated(true); // Set to true when minimized flow is calculated
  };

  return (
    <Container>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        style={{ marginTop: "20px", color: "#3333ff" }}
      >
        Cash Flow Minimizer
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        style={{ color: "#ff3333", fontSize: "30px" }}
      >
        Step 1: Enter Transactions
      </Typography>
      <TransactionInputTable onUpdate={handleTransactionUpdate} />

      <Typography
        variant="h6"
        gutterBottom
        style={{ marginTop: "20px", color: "#ffff4d", fontSize: "30px" }}
      >
        Step 2: Minimized Cash Flow
      </Typography>
      <CashFlowMinimizer
        transactions={transactions}
        onMinimizedFlow={handleMinimizedFlowUpdate}
      />

      <Typography
        variant="h6"
        gutterBottom
        style={{ marginTop: "20px", fontSize: "25px", fontWeight: "bold" }}
      >
        Step 3: Cash Flow Visualization
      </Typography>
      {/* Only show the GraphVisualization if the minimized flow is calculated */}
      {isMinimizedFlowCalculated && (
        <GraphVisualization minimizedFlow={minimizedFlow} />
      )}
    </Container>
  );
}

export default App;
