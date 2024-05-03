import { User } from "@/types/global";
import SettingsItem from "../SettingsItem";
import styles from "./SettingsGoalSection.module.css";
require('dotenv').config();

interface SettingsPreferencesSectionProps {
    darkMode: Boolean;
    currency: string;
    user: User;
}

export default function SettingsPreferencesSection({ darkMode, currency, user }: SettingsPreferencesSectionProps) {

    return (
        <section className={styles.settings_goal_section}>
            <h2>Preferences</h2>
            <div className={styles.settings_goal_items}>
                <SettingsItem title="dark mode" content={darkMode} label="darkMode" user={user} />
                <SettingsItem title="currency" content={currency} label="currency" user={user} />
            </div>
        </section>
    )
}