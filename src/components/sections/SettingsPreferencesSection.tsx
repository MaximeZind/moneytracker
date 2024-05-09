import { User } from "@/types/global";
import SettingsItem from "../SettingsItem";
import styles from "./SettingsGoalSection.module.css";
require('dotenv').config();

interface SettingsPreferencesSectionProps {
    darkMode: Boolean;
    currency: string;
}

export default function SettingsPreferencesSection({ darkMode, currency }: SettingsPreferencesSectionProps) {

    return (
        <section className={styles.settings_goal_section}>
            <h2>Preferences</h2>
            <div className={styles.settings_goal_items}>
                <SettingsItem title="dark mode" content={darkMode} label="darkMode" />
                <SettingsItem title="currency" content={currency} label="currency" />
            </div>
        </section>
    )
}