import styles from "./Table.module.css";

interface TableProps {
    headers: string[];
    data: Record<string, any>[];
  }

export default function Table({headers,data}: TableProps) {

    let balance = 0;
    return (
        <table>
            <thead>
                <tr>
                    {
                        headers && headers.map((header, index) => {
                            return (
                                <th key={index}>{header}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
            {
                        data && data.map((object, index) => {
                            balance = balance + object.income - object.debit;
                            return (
                                <tr key={index}>
                                    {
                                        headers.map((header:string, index) => {
                                            if (header !== "Balance")
                                            return (
                                                <td key={index}>{object[header.toLowerCase()]}</td>
                                            )
                                        })
                                    }
                                    <td>{balance}</td>
                                </tr>
                            )
                        })
                    }
            </tbody>
        </table>
    )
}