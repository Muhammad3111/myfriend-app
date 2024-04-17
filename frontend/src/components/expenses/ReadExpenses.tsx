import * as apiClient from "../../apiClient";
import { useQuery } from "@tanstack/react-query";
import { ExpenseTypes } from "./AddExpense";
import DeleteExpense from "./DeleteExpense";
import UpdateExpense from "./UpdateExpense";
import { InfinitySpin } from "react-loader-spinner";

const ReadExpenses = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["Expenses"],
    queryFn: apiClient.getExpenses,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center basis-1/2">
        <InfinitySpin width="200" color="#5932EA" />
      </div>
    );
  }

  const expenses: ExpenseTypes[] = data;

  return (
    <div className="flex flex-col basis-1/2 px-4 gap-2">
      <h1 className="text-md">Chiqimlar ro'yxati</h1>
      <div className="sx:overflow-auto sx:w-full flex flex-col gap-2">
        {expenses.length > 0 ? (
          expenses.map((c) => (
            <div
              key={c._id}
              className="flex items-center justify-between border p-2 rounded-lg sx:w-full"
            >
              <h1 className="text-lg font-semibold">{c.title}</h1>
              <p className="text-lg font-semibold">{c.amount}$</p>
              <div className="flex items-center gap-4">
                <UpdateExpense _id={c._id} title={c.title} amount={c.amount} />
                <DeleteExpense id={c._id} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <h1 className="text-red-600 text-xl">
              Ma`lumotlar mavjud emas !!!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadExpenses;
