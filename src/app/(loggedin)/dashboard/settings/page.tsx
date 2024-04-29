import styles from "./Settings.module.css";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants";
require('dotenv').config();

export default async function Settings() {

  const userDatas = await getUserDatas();
  const user = userDatas.response.data;
  console.log(user);
  

  return (
    <main className={styles.main}>
      <h1>Settings</h1>
      <p> {user.username}</p>
      <p></p>
    </main>
  )
}

const getUserDatas = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (token) {
    const res = await fetch(`${process.env.API_BASE_URL}api/user`, {
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
