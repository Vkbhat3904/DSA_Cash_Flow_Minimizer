// src/components/TransactionInputTable.jsx
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TransactionInputTable = ({ onUpdate }) => {
  const [transactions, setTransactions] = useState([
    { id: 1, payer: "", payee: "", amount: "" },
  ]);

  const addTransaction = () => {
    setTransactions([
      ...transactions,
      { id: transactions.length + 1, payer: "", payee: "", amount: "" },
    ]);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((trans) => trans.id !== id);
    setTransactions(updatedTransactions);
    onUpdate(updatedTransactions);
  };

  const handleChange = (id, field, value) => {
    const updatedTransactions = transactions.map((trans) =>
      trans.id === id ? { ...trans, [field]: value } : trans
    );
    setTransactions(updatedTransactions);
    onUpdate(updatedTransactions);
  };

  return (
    <TableContainer component={Paper}>
      <Table style={{ backgroundColor: "rgb(211,211,211)" }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "green" }}>Payer</TableCell>
            <TableCell style={{ color: "green" }}>Payee</TableCell>
            <TableCell style={{ color: "green" }}>Amount in ₹</TableCell>
            <TableCell style={{ color: "green" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((trans) => (
            <TableRow key={trans.id}>
              <TableCell>
                <TextField
                  variant="standard"
                  value={trans.payer}
                  onChange={(e) =>
                    handleChange(trans.id, "payer", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="standard"
                  value={trans.payee}
                  onChange={(e) =>
                    handleChange(trans.id, "payee", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="standard"
                  type="number"
                  value={trans.amount}
                  onChange={(e) =>
                    handleChange(trans.id, "amount", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => deleteTransaction(trans.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} align="center">
              <Button onClick={addTransaction} variant="contained">
                Add Transaction
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionInputTable;
