import { Transaction } from "@/types/global";

    // Function to generate all instances of a recurring transaction until the ending date
    export default function generateRecurringInstances(transaction: Transaction) {
        const instances = [];
        let instance = addRecurringTransaction(transaction);
        while (instance !== null) {
            instances.push(instance);
            instance = addRecurringTransaction(instance);
        }
        return instances;
    }

    // Function to add a new instance of a recurring transaction to the array
    function addRecurringTransaction(transaction: Transaction) {

        if (transaction.recurring === true && transaction.frequencyAmount && transaction.frequencyUnit && transaction.recurringEndingDate) {
            // Clone the transaction object
            const newTransaction = { ...transaction };

            // Calculate the next occurrence date based on the frequency
            const { frequencyAmount, frequencyUnit, recurringEndingDate } = transaction;
            let nextDate = new Date(newTransaction.date); // Clone the date
            switch (frequencyUnit.toLowerCase()) {
                case 'days':
                    nextDate.setDate(nextDate.getDate() + frequencyAmount);
                    break;
                case 'weeks':
                    nextDate.setDate(nextDate.getDate() + (frequencyAmount * 7));
                    break;
                case 'months':
                    nextDate.setMonth(nextDate.getMonth() + frequencyAmount);
                    break;
                case 'years':
                    nextDate.setFullYear(nextDate.getFullYear() + frequencyAmount);
                    break;
                default:
                    console.error('Invalid frequency unit:', frequencyUnit);
                    return null; // Return null for an invalid frequency unit
            }

            // Check if the next occurrence date is before the ending date
            if (nextDate <= new Date(recurringEndingDate)) {
                newTransaction.date = new Date (nextDate); // Update the date for the new instance
                return newTransaction; // Return the new instance
            } else {
                return null; // Return null if the instance is beyond the ending date
            }
        } else {
            return null;
        }
    }