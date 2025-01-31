import React, { useState, useEffect } from "react";
import {
  getTransactions,
  updateItemState,
} from "../utils/contractInteractions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const fetchedTransactions = await getTransactions();
      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleUpdateState = async (transactionId) => {
    try {
      await updateItemState(transactionId, "delivered");
      fetchTransactions(); // Refresh the transactions list
    } catch (error) {
      console.error("Error updating item state:", error);
    }
  };

  const soldItems = transactions.filter(
    (t) => t.type === "sold"
  );
  const purchasedItems = transactions.filter(
    (t) => t.type === "purchased"
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">
        Transactions
      </h2>

      <h3 className="text-xl font-semibold mb-4">
        Sold Items
      </h3>
      {soldItems.length === 0 ? (
        <p className="text-gray-500">
          No sold items found.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Buyer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {soldItems.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {transaction.itemName}
                </TableCell>
                <TableCell>
                  {transaction.price} STX
                </TableCell>
                <TableCell>
                  {new Date(
                    transaction.date
                  ).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {transaction.counterparty}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <h3 className="text-xl font-semibold mb-4 mt-8">
        Purchased Items
      </h3>
      {purchasedItems.length === 0 ? (
        <p className="text-gray-500">
          No purchased items found.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchasedItems.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {transaction.itemName}
                </TableCell>
                <TableCell>
                  {transaction.price} STX
                </TableCell>
                <TableCell>
                  {new Date(
                    transaction.date
                  ).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {transaction.counterparty}
                </TableCell>
                <TableCell>{transaction.state}</TableCell>
                <TableCell>
                  {transaction.state === "purchased" && (
                    <Button
                      onClick={() =>
                        handleUpdateState(transaction.id)
                      }
                      size="sm"
                    >
                      Mark as Delivered
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
