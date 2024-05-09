import { User } from "@/types/global";
import SettingsSignInItem from "../SettingsItem";
import styles from "./SettingsSignInSection.module.css";
require('dotenv').config();

interface SettingsSignInSectionProps {
    username: string;
    email: string;
    user: User;
}

export default function SettingsSignInSection({ username, email, user }: SettingsSignInSectionProps) {

    return (
        <section className={styles.settings_signin_section}>
            <h2>Sign In</h2>
            <div className={styles.settings_signin_items}>
                <SettingsSignInItem title="username" label="username" content={username} user={user} />
                <SettingsSignInItem title="email" label="email" content={email} user={user} />
                <SettingsSignInItem title="password" label="password" content={'**********'} user={user} />
            </div>
        </section>
    )
}