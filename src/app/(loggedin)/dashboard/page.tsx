import { cookies } from "next/headers";
import styles from "./Dashboard.module.css";
import SpaceshipAndMoon from '@/components/SpaceshipAndMoon';
import { COOKIE_NAME } from "@/constants";
import { Transaction } from "@/types/global";
import generateRecurringInstances from "@/utils/transactions";
import { revalidatePath } from "next/cache";
import PieChartExpenses from "@/components/charts/PieChartExpenses";
import SankeyChart from "@/components/charts/SankeyChart";


export default async function Dashboard() {

  revalidatePath('/', 'layout');

  // Data fetching
  const transactionsData = await getTransactions();
  const transactions = transactionsData.response.data;
  const categoriesData = await getCategories();
  const categories = categoriesData.response.data;
  const settingsData = await getSettingsDatas();
  const user = settingsData.response.data;

  // Sorting transactions
  const transactionsList = sortTransactions(transactions);
  const todayBalance = calculateTodaysBalance(transactionsList);

  const amountGoal = user.settings.amountGoal;

  function sortTransactions(transactions: Transaction[]) {
    const sortedTransactions = transactions.flatMap((transaction) => {
      if (transaction.recurring === true && transaction.frequencyAmount && transaction.frequencyUnit && transaction.recurringEndingDate) {
        return [transaction, ...generateRecurringInstances(transaction)];
      } else {
        return [transaction];
      }
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return sortedTransactions;
  }

  function calculateTodaysBalance(transactions: Transaction[]) {
    let balance = 0;
    const currentDate = new Date();
    transactions.map((transaction) => {
      // Only up until today
      if (new Date(transaction.date) <= currentDate) {
        if (transaction.type === 'expense') {
          balance = balance - transaction.amount;
        } else if (transaction.type === 'income') {
          balance = balance + transaction.amount;
        }
      }
    });
    return balance;
  }



  return (
    <>
      <div className={styles.dashboard_layout}>
        <section className={styles.dashboard_graphs}>
          <SankeyChart transactions={transactionsList}/>
          <PieChartExpenses transactions={transactionsList} />
        </section>
        <SpaceshipAndMoon balance={todayBalance} goal={amountGoal} />
      </div>
    </>
  )
}

const getTransactions = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (token) {
    const res = await fetch(`${process.env.API_BASE_URL}api/transactions`, {
      method: 'GET',
      headers: {
        Accept: "application/json",
        Authorization: 'Bearer ' + token.value,
      },
    })
    return res.json();
  } else if (!token) {
    return
  }
}

const getCategories = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (token) {
    const res = await fetch(`${process.env.API_BASE_URL}api/categories`, {
      method: 'GET',
      headers: {
        Accept: "application/json",
        Authorization: 'Bearer ' + token.value,
      },
    })
    return res.json();
  } else if (!token) {
    return
  }
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