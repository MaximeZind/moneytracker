
import { User } from "@/types/global";
import SettingsSignInItem from "../SettingsItem";
import styles from "./SettingsGoalSection.module.css";
import Pencil from '@/components/table/Pencil';
require('dotenv').config();

interface SettingsGoalSectionProps {
    goal: number;
    goalDate: Date;
    user: User;
}

export default function SettingsGoalInSection({ goal, goalDate, user }: SettingsGoalSectionProps) {

console.log(new Date(goalDate).toDateString());

    return (
        <section className={styles.settings_goal_section}>
            <h2>Budget Goal</h2>
            <div className={styles.settings_goal_items}>
                <SettingsSignInItem title="goal" content={goal.toString()} user={user} />
                <SettingsSignInItem title="limit date" content={new Date(goalDate).toDateString()} user={user} />
            </div>
        </section>
    )
}