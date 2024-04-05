import AddExpense from "../components/expenses/AddExpense";
import ReadExpenses from "../components/expenses/ReadExpenses";

export default function Expenses() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Chiqimlar</h1>
      <div className="flex sx:flex-col gap-4">
        <AddExpense />
        <ReadExpenses />
      </div>
    </div>
  );
}
