// 'use client'
import styles from "./Dashboard.module.css";
import TransactionsTable from "../../../components/TransactionsTable";
import { getUser } from "@/app/services/getUser";
import { useEffect } from "react";
import { getTransactions } from "@/app/services/transactions";

export default function Dashboard() {

  // const userProfile = '';

  const transactions = getTransactions();
  console.log(transactions);
  
  // useEffect(() => {
  //   getUser().then((response) => {
  //     console.log(response);
      
  //   })
  // })

  return (
    <>
      <h1>Dashboard</h1>
      {/* <TransactionsTable /> */}
    </>
  )
}



// export async function getServerSideProps() {
//   const transactions = await getTransactions();
//   console.log(transactions);
  
// }