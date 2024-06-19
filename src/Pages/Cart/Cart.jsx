import { useContext } from "react";
import { CartContext } from "../../Context/Cart.context";
import { Link } from "react-router-dom";
import Loading from "../../Componants/Loading/Loading.jsx";
export default function Cart() {
  const { cartInfo, RemoveProductToCart, UpdateProductToCart, clearCart } =
    useContext(CartContext);

  return (
    <>
      {cartInfo === null ? (
        <Loading />
      ) : (
        <div>
          <section className="bg-slate-100 p-5">
            <h2>
              <span className="text-xl font-bold">Shop cart </span>
              <i className="fa-solid fa-cart-shopping"></i>
            </h2>
            {cartInfo.length === 0 ? (
              <div className="text-center flex flex-col">
                <h2 className="text-xl font-semibold mt-6">Cart is empty!</h2>
                <Link
                  to="/home"
                  className="btn-primary w-fit mb-6 mx-auto mt-4"
                >
                  ADD YOUR FIRST PRODUCT TO CART
                </Link>
              </div>
            ) : (
              <>
                {cartInfo.data.products.map((product) => (
                  <div
                    key={product._id}
                    className="product gap-4 py-8 grid grid-cols-12"
                  >
                    <div className="col-span-1">
                      <img
                        src={product.product.imageCover}
                        className="w-full"
                      />
                    </div>
                    <div className="flex col-span-11 gap-6 justify-between items-center">
                      <div>
                        <h2 className="text-xl font-bold mb-1">
                          {product.product.title}
                        </h2>
                        <h3 className="text-xl text-primary mb-4">
                          {product.price}
                        </h3>
                        <button
                          onClick={() => {
                            RemoveProductToCart({ id: product.product.id });
                          }}
                          className="bg-red-500 btn-primary"
                        >
                          <i className="fa-solid fa-trash mr-3"></i>
                          Remove
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            UpdateProductToCart({
                              id: product.product.id,
                              count: product.count - 1,
                            });
                          }}
                        >
                          <i className="btn-primary text-white mr-3 text-sm fa-solid fa-minus"></i>
                        </button>
                        <span className="text-lg font-bold text-black">
                          {product.count}
                        </span>
                        <button
                          onClick={() => {
                            UpdateProductToCart({
                              id: product.product.id,
                              count: product.count + 1,
                            });
                          }}
                          className="btn-primary text-white ml-3 text-sm fa-solid fa-plus"
                        ></button>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    clearCart();
                  }}
                  className="btn-primary bg-red-500 w-fit ms-auto mt-4 block"
                >
                  <i className="fa-solid fa-trash mr-3"></i>
                  Clear Cart
                </button>
              </>
            )}
          </section>
        </div>
      )}
      <Link
        to="/checkout"
        className="btn-primary mt-5 w-fit uppercase block ms-auto"
      >
        Next step
      </Link>
    </>
  );
}
