import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/User.context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../Componants/Loading/Loading";
import { Helmet } from "react-helmet";

export default function AllOrders() {
  const [orders, setOrders] = useState(null);
  const { token } = useContext(UserContext);
  const { id } = jwtDecode(token);
  console.log(id);
  async function getOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };
    try {
      const { data } = await axios.request(options);
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Helmet>
        <title>All Orders</title>
        <meta name="description" content="All Orders Page" />
      </Helmet>
      {!orders ? (
        <Loading />
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="order border border-gray-400 rounded p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Order ID</h2>
                <h3 className="text-xl font-bold">#{order.id}</h3>
              </div>
              <div className="mt-4 flex space-x-3">
                <span>
                  {order.isDelivered ? (
                    <span className="btn-primary bg-blue-500 text-white font-cairo py-1 px-3 rounded"></span>
                  ) : (
                    <span className="btn-primary bg-red-500 text-white font-cairo py-1 px-3 rounded">
                      قيد التوصيل
                    </span>
                  )}
                </span>

                <span>
                  {order.ispaid ? (
                    <span className="btn-primary text-white font-cairo py-1 px-3 rounded">
                      تم الدفع
                    </span>
                  ) : (
                    <span className="btn-primary bg-red-500 text-white font-cairo py-1 px-3 rounded">
                      لم يتم الدفع
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              {order.cartItems.map((product) => (
                <div
                  key={product.product._id}
                  className="product col-span-3 border p-2 border-gray-300"
                >
                  <img
                    src={product.product.imageCover}
                    alt="Product"
                    className="w-full rounded"
                  />
                  <div className="mt-2 text-sm text-gray-700">
                    {product.product.title}
                  </div>
                  <h2 className="text-primary font-semibold">
                    {product.price}$
                  </h2>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
}
