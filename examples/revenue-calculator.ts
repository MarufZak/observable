import { createObservable } from "../src";
import { TObserver } from "../src/types";

interface RevenueState {
    income: number;
    expenses: Array<{
        name: string;
        amount: number;
    }>;
}

let revenueState: RevenueState = {
    income: 10000,
    expenses: [],
};

type Event = Parameters<TObserver>[0];

function revenueObserver(event: Event) {
    if (event.type === "set") {
        const totalExpenses = revenueState.expenses.reduce(
            (sum, expense) => sum + expense.amount,
            0
        );

        const netRevenue = revenueState.income - totalExpenses;

        console.log(`- Revenue left: $${netRevenue.toFixed(2)}`);
    }
}

revenueState = createObservable(revenueState, revenueObserver, {
    isRecursive: true,
});

revenueState.expenses.push({ name: "Rent", amount: 2000 });
revenueState.expenses.push({ name: "Salaries", amount: 3500 });
revenueState.expenses.push({ name: "Utilities", amount: 500 });
revenueState.expenses.push({ name: "Marketing", amount: 1000 });
revenueState.expenses.push({ name: "Insurance", amount: 800 });
