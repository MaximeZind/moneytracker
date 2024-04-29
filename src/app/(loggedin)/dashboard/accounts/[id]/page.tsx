'use server'

import { cookies } from "next/headers";
import styles from "./Account.module.css";
import AccountSection from "@/components/sections/AccountSection";
import { COOKIE_NAME } from "@/constants";

export default async function Account({params} : any) {
  
  const accoundId = params.id;
  const accountDatas = await getAccountDatas(accoundId);
  const account = accountDatas.response.data;
  const categoriesDatas = await getCategoriesDatas();
  const categories = categoriesDatas.response.data;

    return (
        <AccountSection account={account} categories={categories}/>
    )
  }

  const getAccountDatas = async (accountId: string) => {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);    
    if (token) {
      const res = await fetch(`${process.env.API_BASE_URL}api/accounts/${accountId}`, {
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