import { cookies } from "next/headers";
import styles from "./Accounts.module.css";
import AccountsSection from "@/components/sections/AccountsSection";
import { COOKIE_NAME } from "@/constants";

export default async function Accounts() {
  const accountsData = await getAccountsDatas();
  const categoriesData = await getCategoriesDatas();
  const accounts = accountsData.response.data;
  const categories = categoriesData.response.data;

  return (
        <AccountsSection accounts={accounts} categories={categories}/>
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

  const getCategoriesDatas = async () => {
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