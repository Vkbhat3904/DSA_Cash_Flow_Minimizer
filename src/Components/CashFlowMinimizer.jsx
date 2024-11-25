// src/components/CashFlowMinimizer.jsx
import React, { useEffect, useState } from "react";
import { Fade } from "@mui/material";  // For fade-in effect

const CashFlowMinimizer = ({ transactions, onMinimizedFlow }) => {
  const [minimizedFlow, setMinimizedFlow] = useState([]);

  useEffect(() => {
    if (transactions.length === 0) return;

    // Step 1: Build balance map from transactions
    const balance = {};
    transactions.forEach(({ payer, payee, amount }) => {
      balance[payer] = (balance[payer] || 0) - parseFloat(amount);
      balance[payee] = (balance[payee] || 0) + parseFloat(amount);
    });

    // Step 2: Separate into creditors and debtors
    const creditors = [];
    const debtors = [];
    Object.keys(balance).forEach((person) => {
      if (balance[person] < 0)
        debtors.push({ person, amount: -balance[person] });
      if (balance[person] > 0)
        creditors.push({ person, amount: balance[person] });
    });

    // Step 3: Minimize cash flow
    const optimizedFlow = [];
    while (debtors.length && creditors.length) {
      const debtor = debtors[0];
      const creditor = creditors[0];
      const settledAmount = Math.min(debtor.amount, creditor.amount);

      optimizedFlow.push({
        payer: debtor.person,
        payee: creditor.person,
        amount: settledAmount,
      });

      debtor.amount -= settledAmount;
      creditor.amount -= settledAmount;

      if (debtor.amount === 0) debtors.shift();
      if (creditor.amount === 0) creditors.shift();
    }

    setMinimizedFlow(optimizedFlow);
    onMinimizedFlow(optimizedFlow);
  }, [transactions, onMinimizedFlow]);

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f7f6", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
      <h2
        style={{
          fontWeight: "700",
          fontSize: "28px",
          color: "#333", // Changed to dark gray for a more professional look
          fontFamily: "'Roboto', sans-serif",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Optimized Cash Flow
      </h2>

      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {minimizedFlow.map((trans, idx) => (
          <Fade key={idx} in={true} timeout={1000}>
            <p
              style={{
                marginTop: "15px",
                fontSize: "18px",
                color: "#1e7e34", // Green for the flow amount
                fontFamily: "'Roboto', sans-serif",
                lineHeight: "1.6",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => e.target.style.color = '#007bff'} // Hover effect
              onMouseOut={(e) => e.target.style.color = '#1e7e34'} // Revert on mouse out
            >
              <span style={{ fontWeight: "bold" }}>{trans.payer}</span> pays{" "}
              <span style={{ fontWeight: "bold" }}>{trans.payee}</span> ₹
              {trans.amount.toFixed(2)}
            </p>
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default CashFlowMinimizer;
