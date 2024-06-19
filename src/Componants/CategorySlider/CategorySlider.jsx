import axios from "axios";

import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
("swiper/react");

export default function CategorySlider() {
  async function getCategory() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    return await axios.request(options);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
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

  return (
    <>
      <div className=" container">
        <span className="text-3xl font-semibold py-5 block">
          The most popular Categories
        </span>
        <swiper-container
          slides-Per-View={6}
          speed={500}
          loop={true}
          // breakpoints={{
          //   640: {
          //     slidesPerView: 1,
          //   },
          //   768: {
          //     slidesPerView: 2,
          //   },
          //   1024: {
          //     slidesPerView: 4,
          //   },
          //   1280: {
          //     slidesPerView: 6,
          //   },
          // }}
          // style={{ padding: "20px 0;" }}
        >
          {data.data.data.map((cat) => (
            <swiper-slide key={cat._id}>
              <Link to={`/category/${cat._id}`}>
                {" "}
                <img
                  className="w-full h-72 object-cover"
                  src={cat.image}
                  alt={cat.name}
                />
                <div className="text-lg font-semibold py-4"> {cat.name}</div>
              </Link>
            </swiper-slide>
          ))}
        </swiper-container>
        :
      </div>
    </>
  );
}
