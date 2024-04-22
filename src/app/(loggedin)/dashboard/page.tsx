'use client'
import styles from "./Dashboard.module.css";
import TransactionsTable from "../../../components/TransactionsTable";
import { getUser } from "@/app/services/getUser";
import { useEffect } from "react";
export default function Dashboard() {

  const userProfile = '';

  useEffect(() => {
    getUser().then((response) => {
      console.log(response);
      
    })
  })

  return (
    <>
      <h1>Dashboard</h1>
      <TransactionsTable />
    </>
  )
}
