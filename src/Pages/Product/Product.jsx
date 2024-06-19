import ProductCard from "../../Componants/ProductCard/ProductCard";
import Loading from "../../Componants/Loading/Loading";

import useProduct from "./../../Hooks/useProduct";
import { Helmet } from "react-helmet";

export default function Product() {
  const { data, isLoading, isError } = useProduct();
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    <div>error</div>;
  }
  console.log({ data });
  return (
    <>
      <Helmet>
        <title>Product</title>
        <meta name="description" content="product Page" />
      </Helmet>
      <div className="py-4 container gap-4 grid grid-cols-12">
        {data.data.data.map((product) => {
          return <ProductCard productInfo={product} key={product.id} />;
        })}
      </div>
    </>
  );
}
