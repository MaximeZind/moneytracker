import { User } from "@/types/global";
import SettingsSignInItem from "../SettingsItem";
import styles from "./SettingsSignInSection.module.css";
require('dotenv').config();

interface SettingsSignInSectionProps {
    username: string;
    email: string;
}

export default function SettingsSignInSection({ username, email}: SettingsSignInSectionProps) {

    return (
        <section className={styles.settings_signin_section}>
            <h2>Sign In</h2>
            <div className={styles.settings_signin_items}>
                <SettingsSignInItem title="username" label="username" content={username} />
                <SettingsSignInItem title="email" label="email" content={email} />
                <SettingsSignInItem title="password" label="password" content={'**********'}/>
            </div>
        </section>
    )
}