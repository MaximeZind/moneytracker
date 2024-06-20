import styles from "./AddTransaction.module.css";
import NewTransactionForm from "@/components/forms/NewTransactionForm";
import Button from "@/components/forms/formscomponents/SubmitButton";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants";

export default async function AddTransaction() {

  const categoriesData = await getCategories();
  const accountsData = await getAccountsDatas();
  const categories = categoriesData.response.data;
  const accounts = accountsData.response.data;
  
  return (
    <section className={styles.new_transaction_section}>
      {
        accounts.length > 0 && categories.length > 0 ? (
          <>
            <h1>Add Transaction</h1>
            <NewTransactionForm accounts={accounts} categories={categories} />
          </>
        ) : accounts.length > 0 ? (
          <>
            <p>Looks like you don't have any categories created. You will need at least one to create a transaction. Click on the button below to get started:</p>
            <Button value={""} text={"Categories"} url={"/dashboard/categories"}/>
          </>
        ) : (
          <>
            <p>Looks like you don't have any account created. You will need at least one to create a transaction. Click on the button below to get started:</p>
            <Button value={""} text={"Create a new account"} url={"/dashboard/accounts/newaccount"}/>
          </>
        )
      }
    </section>
  )
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