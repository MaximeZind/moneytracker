import styles from "./Transactions.module.css";
import TransactionsTable from "@/components/TransactionsTable";
import Collapse from "@/components/Collapse";
import CategoriesSection from "@/components/sections/CategoriesSection";
import NewTransactionForm from "@/components/forms/NewTransactionForm";
import TransactionsLeftSection from "@/components/sections/TransactionsLeftSection";

export default function Transactions() {

  return (
    <div className={styles.transactions_layout}>
      {/* <section className={styles.add_transaction_category_section}> */}
      {/* <Collapse title="Add Transaction"> */}
          {/* <NewTransactionForm /> */}
        {/* </Collapse> */}
        {/* <Collapse title="Categories"> */}
          {/* <CategoriesSection /> */}
        {/* </Collapse> */}
      {/* </section> */}
      <TransactionsLeftSection />
      <section className={styles.transactions_section}>
        <h1>Transactions</h1>
        <a href="/dashboard/transactions/add">Add a Transaction</a>
        <TransactionsTable />
      </section>
    </div>
  )
}
