import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Componants/Loading/Loading";

export default function CategoriesDetails() {
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  async function getCategory() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    setDetails(data.data);
  }
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      {details == null ? (
        <Loading />
      ) : (
        details.category.map((category) => (
          <div className="grid grid-cols-12" key={category.id}>
            <div className="border p-5 rounded-lg border-slate-400 col-span-12 md:col-span-4">
              <img
                src={
                  "https://ecommerce.routemisr.com/Route-Academy-categories/1681511156008.png"
                }
                alt=""
                className="w-full "
              />
              <h2 className="text-xl font-semibold">{category.name}</h2>{" "}
              <h3 className="text-lg text-gray-600">{category.slug}</h3>{" "}
              <Link
                to="/categories"
                className="font-medium btn-primary mr-5 mt-4 inline-block"
              >
                Back to Categories
              </Link>
              <Link
                to="/home"
                className="font-medium btn-primary  mt-4 inline-block"
              >
                Back to Home Page
              </Link>
            </div>
          </div>
        ))
      )}
    </>
  );
}
