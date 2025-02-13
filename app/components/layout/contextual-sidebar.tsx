import { Link, Outlet, useMatches } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";
import { tw } from "~/utils";

export default function ContextualSidebar() {
  const matches = useMatches();
  /** Get the last asset which refers to the current route */
  const currentRoute = matches[matches.length - 1];

  /** We need the prev route, as we use it for navigating back/closing the sidebar */
  const prevRoute = matches[matches.length - 2];
  const showSidebar = currentRoute?.data?.showSidebar;

  return (
    <AnimatePresence>
      {showSidebar && (
        <div className="absolute inset-0">
          <Link to={prevRoute.pathname} className="block h-full w-full">
            <div
              // onClick={toggleSidebar}
              className={tw(
                "fixed right-0 top-0 z-10 h-screen w-screen cursor-pointer bg-gray-25/70 backdrop-blur transition duration-300 ease-in-out",
                showSidebar ? "visible" : "invisible opacity-0"
              )}
            ></div>
          </Link>

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.1 }}
            className="download-qr-sidebar fixed right-0 top-0 z-50 box-border h-screen w-[392px] border border-solid border-gray-200 bg-white p-6"
          >
            <div className=" h-full w-full bg-white p-6">
              <Outlet />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
