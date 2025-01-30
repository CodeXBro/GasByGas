import React, { useMemo, useState, useEffect } from "react";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Building,
  CalculatorIcon,
  ListChecks,
  TrainIcon,
  BookCheck,
  LayoutDashboardIcon,
  MenuIcon,
  Sidebar,
  User,
} from "lucide-react";
import styled from "styled-components";
import DropdownMenu from "../subcomponents/dropdown";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/data";
import useUser from "@/hooks/useUser";
import { Sign } from "crypto";
import Logo from "../logo";

// Styled Components
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  margin: 0 auto;
  border-radius: 12px;
  width: calc(100% - 40rem);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  background: #e8e9eb;

  @media (max-width: 1200px) {
    padding: 1rem 3rem;
    width: calc(100% - 30rem);
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    width: calc(100% - 24rem);
  }

  @media (max-width: 480px) {
    padding: 1rem 1rem;
    width: calc(100% - 2rem);
  }
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  a {
    color: #222;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.3s ease;

    &:hover {
      color: #e8e9eb;
    }
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  color: #222;
  font-size: 1rem;
  font-weight: 600;
  position: relative;

  &:hover {
    color: #ffa500;
  }
`;

const MenuButtonWrapper = styled.div`
  position: relative;
  margin-left: auto;
`;

const Header = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isAdmin, isOutletManager, isBusiness, user } = useUser();

  const [navigation, setNavigation] = useState([
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboardIcon className="w-6 h-6" />,
    },
    { name: "Projects", href: "/projects", icon: <Menu className="w-6 h-6" /> },
    { name: "Tasks", href: "/tasks", icon: <Menu className="w-6 h-6" /> },
  ]);

  useEffect(() => {
    let menu = [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboardIcon className="w-6 h-6" />,
      },
    ];

    if (isAdmin) {
      menu.push(
        {
          name: "Outlets",
          href: "/outlets",
          icon: <Building className="w-6 h-6" />,
        },
        {
          name: "Inventory",
          href: "/inventory",
          icon: <CalculatorIcon className="w-6 h-6" />,
        },
        {
          name: "Deliveries",
          href: "/deliveries",
          icon: <TrainIcon className="w-6 h-6" />,
        }
      );
    } else if (isOutletManager) {
      menu.push(
        {
          name: "Requests",
          href: "/requests",
          icon: <ListChecks className="w-6 h-6" />,
        },
        {
          name: "Deliveries",
          href: "/deliveries",
          icon: <TrainIcon className="w-6 h-6" />,
        },
        {
          name: "Stocks",
          href: "/stocks",
          icon: <BookCheck className="w-6 h-6" />,
        }
      );
    } else {
      menu.push({
        name: "Requests",
        href: "/requests",
        icon: <ListChecks className="w-6 h-6" />,
      });
    }

    setNavigation(menu);
  }, [isAdmin, isOutletManager]);

  const onLogout = () => {
    dispatch.auth.logout();
  };

  const header = useMemo(() => {
    if (isAdmin) return "Admin";
    if (isOutletManager) {
      return `${(user?.outlet as any)?.name || "Outlet"} [Outlet]`;
    }
    return isBusiness ? "Business" : "Customer";
  }, [isAdmin, isOutletManager, isBusiness, user]);

  return (
    <HeaderContainer>
      <Logo />
      <NavMenu>
        {navigation.map((item) => (
          <a key={item.name} href={item.href}>
            {item.icon}
            <span>{item.name}</span>
          </a>
        ))}
      </NavMenu>
      <UserSection>
        <MenuButtonWrapper>
          <DropdownMenu
            buttonText={<User className="w-6 h-6" />}
            items={[
              {
                label: "Profile",
                onClick: () => (window.location.href = "/settings/profile"),
              },
              {
                label: "Change Password",
                onClick: () =>
                  (window.location.href = "/settings/change-password"),
              },
              { label: "Logout", onClick: onLogout },
            ]}
          />
        </MenuButtonWrapper>
      </UserSection>
    </HeaderContainer>
  );
};

export default Header;
