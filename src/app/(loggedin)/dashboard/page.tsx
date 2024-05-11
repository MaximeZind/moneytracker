import styles from "./Dashboard.module.css";
import SpaceshipAndMoon from '@/components/SpaceshipAndMoon';


export default function Dashboard() {


  return (
    <>
      {/* <h1>Dashboard</h1> */}
      <div className={styles.dashboard_layout}>
        <section className={styles.dashboard_graphs}>

        </section>
        <SpaceshipAndMoon />
      </div>
    </>
  )
}
