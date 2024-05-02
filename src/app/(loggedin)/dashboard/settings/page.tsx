import styles from "./Settings.module.css";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants";
import Pencil from '@/components/table/Pencil';
import SettingsSignInSection from "@/components/sections/SettingsSignInSection";
require('dotenv').config();

export default async function Settings() {

  const userDatas = await getSettingsDatas();
  const user = userDatas.response.data;
  const settings = user.settings;

  function handleClickPencil() {

  }

  return (
    <main className={styles.main}>
      <h1>Settings</h1>
      <SettingsSignInSection username={user.username} email={user.email} user={user} />
        <div>
        <strong>Currency:</strong>
        <p>{settings.currency}</p>
        <span>
          {/* <Pencil openModal={handleClickPencil} /> */}
        </span>
      </div>
    </main>
  )
}

const getSettingsDatas = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (token) {
    const res = await fetch(`${process.env.API_BASE_URL}api/settings`, {
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
