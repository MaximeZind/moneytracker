import styles from "./Transactions.module.css";
import TransactionsTable from "@/components/TransactionsTable";
export default function Transactions() {

  return (
    <>
      <h1>Transactions</h1>
      <a href="/dashboard/transactions/add">Add a Transaction</a>
      <TransactionsTable />
    </>
  )
}
