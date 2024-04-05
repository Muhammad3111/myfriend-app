import AddCategory from "../components/categories/AddCategory";
import ReadCategories from "../components/categories/ReadCategories";

export default function Categories() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Bo'limlar</h1>
      <div className="flex sx:flex-col gap-4">
        <AddCategory />
        <ReadCategories />
      </div>
    </div>
  );
}
