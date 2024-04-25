import styles from "./Transactions.module.css";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants";
import TransactionsLayoutSection from "@/components/sections/TransactionsLayoutSection";

export default async function Transactions() {

  const transactionsData =  await getTransactions();
  const categoriesData = await getCategories();
  const accountsData = await getAccountsDatas();
  const transactions = transactionsData.response.data;
  const categories = categoriesData.response.data;
  const accounts = accountsData.response.data;

  return (
    <div className={styles.transactions_pages}>
      <TransactionsLayoutSection transactions={transactions} categories={categories} accounts={accounts} />
    </div>
  )
}

const getTransactions = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (token) {
    const res = await fetch(`${process.env.API_BASE_URL}api/transactions`, {
      method: 'GET',
      headers: {
        Accept: "application/json",
        Authorization: 'Bearer ' + token.value,
      },
    })
    return res.json();
  } else if (!token) {
    return 
  }
}

const getCategories = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (token) {
    const res = await fetch(`${process.env.API_BASE_URL}api/categories`, {
      method: 'GET',
      headers: {
        Accept: "application/json",
        Authorization: 'Bearer ' + token.value,
      },
    })
    return res.json();
  } else if (!token) {
    return 
  }
}

const getAccountsDatas = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (token) {
    const res = await fetch(`${process.env.API_BASE_URL}api/accounts`, {
      next: { revalidate: 10 },
      method: 'GET',
      headers: {
        Accept: "application/json",
        Authorization: 'Bearer ' + token.value,
      },
    })
    return res.json()
  } else if (!token) {
    return 
  }
}