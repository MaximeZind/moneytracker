import { User } from "@/types/global";
import SettingsSignInItem from "../SettingsItem";
import styles from "./SettingsGoalSection.module.css";
import Pencil from '@/components/table/Pencil';
require('dotenv').config();

interface SettingsGoalSectionProps {
    goal: number;
    goalDate: Date;
}

export default function SettingsGoalSection({ goal, goalDate }: SettingsGoalSectionProps) {

    return (
        <section className={styles.settings_goal_section}>
            <h2>Budget Goal</h2>
            <div className={styles.settings_goal_items}>
                <SettingsSignInItem title="goal" content={goal} label="amountGoal" />
                <SettingsSignInItem title="limit date" content={new Date(goalDate)} label="goalDate" />
            </div>
        </section>
    )
}