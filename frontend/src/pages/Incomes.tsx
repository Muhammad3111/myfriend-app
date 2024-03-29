import ReadIncomes from "../components/incomes/ReadIncomes";

export default function Incomes() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Kirimlar</h1>
      <ReadIncomes />
    </div>
  );
}
