import SettingsSignInItem from "../SettingsItem";
import styles from "./SettingsGoalSection.module.css";
require('dotenv').config();

interface SettingsGoalSectionProps {
    goal: number;
    goalDate: Date;
    currency: string;
}

export default function SettingsGoalSection({ goal, goalDate, currency }: SettingsGoalSectionProps) {
    
    return (
        <section className={styles.settings_goal_section}>
            <h2>Budget Goal</h2>
            <div className={styles.settings_goal_items}>
                <SettingsSignInItem title="goal" content={goal} label="amountGoal" currency={currency} />
                <SettingsSignInItem title="limit date" content={new Date(goalDate)} label="goalDate" />
            </div>
        </section>
    )
}