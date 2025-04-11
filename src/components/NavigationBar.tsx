import React from "react";
import { Home, Compass, Bookmark, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { auth } from "../utils/firebaseConfig";
import _ from "lodash";

type Nav = "main" | "location" | "bookmark" | "my";
interface NavList {
  title: string;
  icon: JSX.Element;
  navType: Nav;
  mr: number;
  path: string;
}

const navMenus: NavList[] = [
  {
    title: "홈",
    icon: <Home className="w-5 h-5" />,
    navType: "main",
    mr: 3,
    path: "/",
  },
  {
    title: "내 위치",
    icon: <Compass className="w-5 h-5" />,
    navType: "location",
    mr: 1,
    path: "/my-location",
  },
  {
    title: "내 정보",
    icon: <User className="w-5 h-5" />,
    navType: "my",
    mr: 1,
    path: "/my-info",
  },
];

const authNavMenus: NavList[] = [
  {
    title: "홈",
    icon: <Home className="w-5 h-5" />,
    navType: "main",
    mr: 3,
    path: "/",
  },
  {
    title: "내 위치",
    icon: <Compass className="w-5 h-5" />,
    navType: "location",
    mr: 1,
    path: "/my-location",
  },
  {
    title: "북마크",
    icon: <Bookmark className="w-5 h-5" />,
    navType: "bookmark",
    mr: 1,
    path: "/bookmark",
  },
  {
    title: "내 정보",
    icon: <User className="w-5 h-5" />,
    navType: "my",
    mr: 1,
    path: "/my-info",
  },
];

const NavigationBar: React.FC = () => {
  const user = auth.currentUser;
  const navList: NavList[] = !_.isNull(user) ? authNavMenus : navMenus;

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-md border border-main-gray-100 flex justify-between items-center h-[60px] bg-white rounded-[34px] shadow-[0_4px_4px_rgba(0,0,0,0.1)] px-1">
      {navList.map((item, i) => (
        <NavLink
          key={i}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center justify-center h-[52px] w-3/12 rounded-[32px] hover:cursor-pointer transition-all duration-300 ease-in-out ${
              isActive ? "bg-[#EBEBEB] border text-black" : "text-[#999999]"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="mr-1">{item.icon}</div>
              {isActive && (
                <span className="text-xs font-thin">{item.title}</span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavigationBar;
