import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loading from "../../Componants/Loading/Loading";
// import { Link } from "react-router-dom";

export default function Brands() {
  const getBrands = async () => {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };
    return await axios.request(options);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: "brands",
    queryFn: getBrands,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading brands.</div>;
  }

  return (
    <>
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="Brands Page" />
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.data.data.map((brand) => (
          <div
            key={brand._id}
            className="bg-white shadow-md rounded-lg p-4 transform transition duration-300 hover:shadow-lg hover:scale-105"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-2">{brand.name}</h2>
            <h2 className="text-sm text-gray-500">{brand.slug}</h2>
            {/* <Link to={`/brands/${brand._id}`} className="text-sm text-gray-500">
              Tap for more information
            </Link> */}
          </div>
        ))}
      </div>
    </>
  );
}
