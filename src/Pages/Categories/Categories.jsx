import axios from "axios";
import Loading from "../../Componants/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

// Define the getCategories function outside the component
async function getCategories() {
  const options = {
    url: "https://ecommerce.routemisr.com/api/v1/categories",
    method: "GET",
  };

  return await axios.request(options);
}

export default function Categories() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 5000,
    refetchInterval: 5000,
    refetchIntervalInBackground: false,
    gcTime: 10000,
    retry: 3,
    retryDelay: 2000,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Helmet>
        <title>Categories</title>
        <meta name="description" content="Categories Page" />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          {data.data.data.map((category) => (
            <div
              key={category._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                className="rounded-t-lg w-full h-72 object-cover"
                src={category.image}
                alt={category.name}
              />
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
                <Link
                  to={`/categories/${id}`}
                  className=" cursor-pointer text-slate-500 hover:text-black text-lg"
                >
                  Tap to show more deatails
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
