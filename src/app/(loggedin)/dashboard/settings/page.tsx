import styles from "./Settings.module.css";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants";
import SettingsSignInSection from "@/components/sections/SettingsSignInSection";
import SettingsGoalSection from "@/components/sections/SettingsGoalSection";
import SettingsPreferencesSection from "@/components/sections/SettingsPreferencesSection";
import { revalidatePath } from 'next/cache';

require('dotenv').config();

export default async function Settings() {

revalidatePath('/', 'layout')

  const userDatas = await getSettingsDatas();
  const user = userDatas.response.data;
  const settings = user.settings;

  return (
    <section className={styles.main}>
      <h1>Settings</h1>
      <div className={styles.settings_sections}>
        <SettingsSignInSection username={user.username} email={user.email} />
        <SettingsGoalSection goal={settings.amountGoal} goalDate={settings.goalDate} currency={settings.currency} />
        <SettingsPreferencesSection darkMode={settings.darkMode} currency={settings.currency}/>
      </div>
    </section>
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
