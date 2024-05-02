
import { User } from "@/types/global";
import SettingsSignInItem from "../SettingsItem";
import styles from "./SettingsSignInSection.module.css";
import Pencil from '@/components/table/Pencil';
require('dotenv').config();

interface SettingsSignInSectionProps {
    username: string;
    email: string;
    user: User;
}

export default function SettingsSignInSection({username, email, user} : SettingsSignInSectionProps) {


  return (
    <section className={styles.settings_signin_section}>
      <h1>Sign In</h1>
      <SettingsSignInItem title="username" content={username} user={user} />
      <SettingsSignInItem title="email" content={email} user={user} />
      <SettingsSignInItem title="password" content={'**********'} user={user} />
    </section>
  )
}