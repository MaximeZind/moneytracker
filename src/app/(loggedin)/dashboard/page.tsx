import styles from "./Dashboard.module.css";
import TransactionsTable from "../../../components/TransactionsTable";
export default function Dashboard() {

  const userProfile = '';

  return (
    <>
      <h1>Dashboard</h1>
      <TransactionsTable />
    </>
  )
}
