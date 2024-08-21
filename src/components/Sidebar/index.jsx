import {
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  LogOut
} from "lucide-react";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";
import { IoIosArrowRoundBack } from "react-icons/io";

const SidebarContext = createContext();

export default function Sidebar({ children, sidebarOpen, setSidebarOpen }) {
  const [expanded, setExpanded] = useState(true);
  const { resetLoginData } = useContext(AuthContext);
  const navigate = useNavigate();



  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target))
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    document.querySelector("body")?.classList.toggle("sidebar-expanded", sidebarExpanded);
  }, [sidebarExpanded]);

  const logOut = () => {
    resetLoginData();
    navigate("/login");
  };

  return (
    <aside
      className={`absolute left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav
        className={`h-full flex flex-col border-r shadow-sm bg-black text-white ${
          sidebarOpen ? "flex" : "hidden"
        } lg:flex`}
      >
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden block mx-auto">
        <IoIosArrowRoundBack  className="text-5xl"/>
        </button>
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <button
          onClick={logOut}
          className="flex items-center py-4 px-3 my-1 font-medium rounded-md cursor-pointer text-gray-600 hover:bg-gray-700 hover:bg-graydark transition-colors"
        >
          <LogOut className="mr-3" size={20} />
          {expanded && <span>Logout</span>}
        </button>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, to, children }) {
  const { expanded } = useContext(SidebarContext);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const handleToggle = () => {
    setOpen(!open);
  };

  const isActive = pathname === to;

  return (
    <>
      <li
        className={`
          relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer
          transition-colors group ${
            isActive
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-graydark text-gray-600"
          }
        `}
        onClick={handleToggle}
      >
        <Link to={to} className="flex items-center w-full">
          {icon && <span className="mr-3">{icon}</span>}
          {expanded && (
            <span
              className={`overflow-hidden transition-all ${expanded ? "w-52" : "w-0"}`}
            >
              {text}
            </span>
          )}
        </Link>
        {children && (
          <ChevronDown
            className={`ml-auto transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
      </li>
      {open && expanded && <ul className="pl-8">{children}</ul>}
    </>
  );
}

export function SidebarSubItem({ text, to }) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <li
      className={`py-1.5 px-3 flex items-center rounded-md cursor-pointer ${
        isActive ? "bg-indigo-100 text-indigo-800" : "text-gray-600 hover:bg-graydark"
      }`}
    >
      <Link to={to} className="flex items-center w-full">
        {text}
      </Link>
    </li>
  );
}
