import Sidebar from "../ui/Sidebar";
import { Outlet } from "react-router-dom";

export default function CoursesLayout() {
  return (
    /* FIX: Removed 'overflow-hidden'. 
       'items-start' ensures the sidebar doesn't try to stretch the flex row 
       beyond the viewport height if it doesn't need to.
    */
    <div className="flex min-h-screen bg-slate-950 items-start">
      {/* The Sidebar is now free to be 'sticky' because the parent 
         div doesn't have overflow-hidden.
      */}
      <Sidebar />

      {/* Main content area 
         'flex-1' takes up the remaining width.
         We remove overflow-y-auto here so the whole window handles the scrolling,
         which is much smoother for 'sticky' sidebars.
      */}
      <main className="flex-1 min-w-0">
        <div className="p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
