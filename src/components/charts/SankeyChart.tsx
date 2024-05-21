'use client'

import { ResponsiveContainer, Sankey, Tooltip } from "recharts";
import styles from "./SankeyChart.module.css";
import { Transaction } from "@/types/global";

interface Props {
  transactions: Transaction[];
}


interface Categories {
  [key: string]: Transaction[];
}



export default function SankeyChart({ transactions }: Props) {

  function setData(transactions: Transaction[]) {
    let incomeTransactions: Transaction[] = [];
    let expenseTransactions: Transaction[] = [];
    let incomeCategories: Categories = {};
    let expenseCategories: Categories = {};
    let totalIncome: number = 0;
    let totalExpenses: number = 0;
    transactions.map((transaction) => {
      const categoryName: string = transaction.category.name;
      if (transaction.type === 'expense') {
        expenseTransactions.push(transaction);
        totalExpenses = totalExpenses + transaction.amount;
        if (Object.keys(expenseCategories).includes(categoryName)) {
          expenseCategories[categoryName].push(transaction);
        } else if (!Object.keys(expenseCategories).includes(categoryName)) {
          expenseCategories[categoryName] = [transaction];
        }
      } else if (transaction.type === 'income') {
        incomeTransactions.push(transaction);
        totalIncome = totalIncome + transaction.amount;
        if (Object.keys(incomeCategories).includes(categoryName)) {
          incomeCategories[categoryName].push(transaction);
        } else if (!Object.keys(incomeCategories).includes(categoryName)) {
          incomeCategories[categoryName] = [transaction];
        }
      }
    })
    const savings = totalIncome - totalExpenses;
    const incomeCategoriesNames = Object.keys(incomeCategories);
    const expenseCategoriesNames = Object.keys(expenseCategories);
    const incomeNodes = incomeCategoriesNames.map((categoryName) => ({
      name: categoryName,
    }));
    const expenseNodes = expenseCategoriesNames.map((categoryName) => ({
      name: categoryName,
    }));

    // Combine income and expense nodes into a single nodes array
    const nodes = [...incomeNodes, { "name": "Total income" }, ...expenseNodes, { "name": "Savings" }];

    let index = 0;
    const middleIndex = incomeNodes.length;
    const incomeLinks = incomeCategoriesNames.map((name) => {
      let totalAmount = 0;
      incomeCategories[name].map((transaction) => {
        totalAmount = totalAmount + transaction.amount;
      })
      const link = {
        "source": index,
        "target": middleIndex,
        "value": totalAmount
      };
      index++;
      return link;
    })



    const expenseLinks = expenseCategoriesNames.map((name) => {
      let totalAmount = 0;
      expenseCategories[name].map((transaction) => {
        totalAmount = totalAmount + transaction.amount;
      })
      const link = {
        "source": middleIndex,
        "target": index + 1,
        "value": totalAmount
      };
      index++
      return link;
    })
    const links = [...incomeLinks, ...expenseLinks, {
      "source": middleIndex,
      "target": index + 1,
      "value": savings
    }];

    return {
      "nodes": nodes,
      "links": links,
    }
  }

  const data = setData(transactions);

  return (
    <div className={styles.container}>
      <ResponsiveContainer className={styles.container} height={500}>
        <Sankey
          data={data}
          node={(nodeProps) => (
            <g>
              <rect
                x={nodeProps.x}
                y={nodeProps.y}
                width={nodeProps.width}
                height={nodeProps.height}
                fill="#5192ca"
                fillOpacity={1}
                className="recharts-rectangle"
                d={`M ${nodeProps.x},${nodeProps.y} h ${nodeProps.width} v ${nodeProps.height} h -${nodeProps.width} Z`}
              />
              <text
                textAnchor="start"
                x={nodeProps.x + 16}
                y={nodeProps.y + 17}
                fontSize={14}
                stroke="#333"
              >
                {nodeProps.payload.name}
              </text>
              <text
                textAnchor="start"
                x={nodeProps.x + 16}
                y={nodeProps.y + 30}
                fontSize={12}
                stroke="#333"
                strokeOpacity={0.5}
              >
                {nodeProps.payload.value}
              </text>
            </g>
          )}
          nodePadding={50}
          margin={{
            left: 50,
            right: 80,
            top: 75,
            bottom: 75,
          }}
          link={{ stroke: '#77c878' }}
        >
          <Tooltip />
        </Sankey>
      </ResponsiveContainer>
    </div>

  )
}
