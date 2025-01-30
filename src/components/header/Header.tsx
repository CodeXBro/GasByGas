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
  User,
} from "lucide-react";
import styled from "styled-components";
import DropdownMenu from "../subcomponents/dropdown";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/data";
import useUser from "@/hooks/useUser";
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
  position: relative;

  @media (max-width: 1200px) {
    padding: 1rem 3rem;
    width: calc(100% - 30rem);
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    width: 100%;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;

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
      color: #ffa500;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #222;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const MenuButtonWrapper = styled.div`
  background: #e8e9eb;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;
  position: relative;

  &:hover {
    background: #d6d6d6;
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  background: #e8e9eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 150px;
  padding: 8px;
  z-index: 100;
`;

const MobileNavMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  top: 60px;
  right: 10px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 8px;
  width: 200px;
  z-index: 100;
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <MenuIcon className="w-6 h-6" />
      </MobileMenuButton>
      {mobileMenuOpen && (
        <MobileNavMenu>
          {navigation.map((item) => (
            <a key={item.name} href={item.href}>
              {item.icon}
              <span>{item.name}</span>
            </a>
          ))}
        </MobileNavMenu>
      )}
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
