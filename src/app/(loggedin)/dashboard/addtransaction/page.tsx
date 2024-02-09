import styles from "./AddTransaction.module.css";
import TransactionsTable from "../../../../components/TransactionsTable";
import NewTransactionForm from "@/components/forms/NewTransactionForm";

export default function AddTransaction() {

  return (
    <>
      <h1>Add Transaction</h1>
      <NewTransactionForm />
    </>
  )
}
