import React, { useEffect, useState } from "react";
import { Home, Compass, Bookmark, User } from "lucide-react"; // 예시 아이콘
import { useLocation, useNavigate } from "react-router-dom";

type Nav = "main" | "location" | "bookmark" | "my";
interface NavList {
  title: string;
  icon: any;
  navType: Nav;
  mr: number;
  path: string;
}

/** 네비게이션 */
const naviMenus: NavList[] = [
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

const NavigationBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [selectedNavType, setSelectedNavType] = useState<Nav>("main");

  /** ========================================================================= */

  /** 네비게이션 클릭 */
  const handleClickNav = (nav: NavList) => {
    navigate(nav.path);
  };

  /** ========================================================================= */

  useEffect(() => {
    const matchingMenu = naviMenus.find((menu) => menu.path === pathname);
    setSelectedNavType(matchingMenu?.navType);
  }, [pathname]);

  /** ========================================================================= */

  return (
    <nav className="fixed bottom-6 left-6 right-6 border border-main-gray-100 flex justify-between items-center h-[60px] bg-main-white rounded-[34px] shadow-[0_4px_4px_rgba(0,0,0,0.1)] px-1">
      {naviMenus.map((item: NavList, i: number) => (
        <div
          key={i}
          className={`flex items-center justify-center 
             ${item.navType !== selectedNavType && "text-[#999999]"}
            ${
              item.navType === selectedNavType &&
              "bg-[#EBEBEB] border text-black"
            }  h-[52px] w-3/12  rounded-[32px]`}
          onClick={() => {
            handleClickNav(item);
          }}
        >
          {/* <div className={`mr-${item.mr}`}>{item.icon}</div> */}
          <div className={`mr-1`}>{item.icon}</div>
          {item.navType === selectedNavType && (
            <span className="text-xs font-thin">{item.title}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default NavigationBar;
