import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      layout
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}
