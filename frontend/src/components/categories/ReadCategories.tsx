import * as apiClient from "../../apiClient";
import { useQuery } from "@tanstack/react-query";
import DeleteCategory from "./DeleteCategory";
import UpdateCategory from "./UpdateCategory";
import { InfinitySpin } from "react-loader-spinner";

type CategoryTypes = {
  _id: string;
  title: string;
};

const ReadCategories = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["Categories"],
    queryFn: apiClient.getCategory,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center basis-1/2">
        <InfinitySpin width="200" color="#5932EA" />
      </div>
    );
  }

  const categories: CategoryTypes[] = data;

  return (
    <div className="flex flex-col basis-1/2 px-4 justify-center gap-2">
      <h1 className="text-md">Bo'limlar ro'yxati</h1>
      {categories.length > 0 ? (
        categories.map((c) => (
          <div
            key={c._id}
            className="flex items-center justify-between border p-2 rounded-lg"
          >
            <h1 className="text-lg font-semibold">{c.title}</h1>
            <div className="flex items-center gap-4">
              <UpdateCategory _id={c._id} title={c.title} />
              <DeleteCategory id={c._id} />
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <h1 className="text-red-600 text-xl">Ma`lumotlar mavjud emas !!!</h1>
        </div>
      )}
    </div>
  );
};

export default ReadCategories;
