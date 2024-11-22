// src/components/CashFlowMinimizer.jsx
import React, { useEffect, useState } from "react";

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
    <div>
      <h2 style={{ fontWeight: "bold", fontSize: "25px" }}>
        Optimized Cash Flow
      </h2>
      {minimizedFlow.map((trans, idx) => (
        <p
          key={idx}
          style={{
            marginTop: "5px",
            fontSize: "20px",
            color: "#33ff77",
          }}
        >
          {trans.payer} pays {trans.payee} ₹{trans.amount.toFixed(2)}
        </p>
      ))}
    </div>
  );
};

export default CashFlowMinimizer;
