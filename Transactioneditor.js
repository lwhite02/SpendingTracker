import { useState, useEffect } from "react";
import { Table, Select, Button } from "@mantine/core";

const categories = [
  "Groceries", "Fuel", "Entertainment", "Dining", "Shopping", "Bills", "Other"
];

export default function TransactionEditor({ transactions }) {
  const [editableTransactions, setEditableTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("categorizedTransactions")) || transactions;
    setEditableTransactions(storedTransactions);
  }, [transactions]);

  const updateCategory = (index, category) => {
    const updatedTransactions = [...editableTransactions];
    updatedTransactions[index].category = category;
    setEditableTransactions(updatedTransactions);
    localStorage.setItem("categorizedTransactions", JSON.stringify(updatedTransactions));
  };

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount (R)</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {editableTransactions.map((transaction, index) => (
          <tr key={index}>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td>{transaction.amount.toFixed(2)}</td>
            <td>
              <Select
                data={categories}
                value={transaction.category || "Other"}
                onChange={(value) => updateCategory(index, value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
