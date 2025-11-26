import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar";

export default function LibraryLayout() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
}
