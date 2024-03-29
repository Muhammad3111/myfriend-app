import ReadProducts from "../components/products/ReadProducts";

export default function Products() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Mahsulotlar</h1>
      <ReadProducts />
    </div>
  );
}
