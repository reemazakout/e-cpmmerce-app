import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Offline, Online } from "react-detect-offline";
import internet from "../../assets/images/undraw_internet_on_the_go.svg";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Online>
        {/* بادينج توب عقد النافبار وبادينج بوتوم عقد الفوتر */}
        <div className="container pt-[80px] pb-[250px]">
          <Outlet />
        </div>
      </Online>
      <Offline>
        <h1 className="text-3xl min-h-screen fixed left-0 right-0 top-0 bottom-0 z-[12345] flex items-center justify-center bg-white">
          You are offline, check your connection..
          <img src={internet} alt="" className="w-1/2" />
        </h1>
      </Offline>
      <Footer />
    </>
  );
}
