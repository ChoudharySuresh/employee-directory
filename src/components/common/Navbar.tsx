import { Button } from "@/components/ui/button";
import { LuSun, LuMoon } from "react-icons/lu";
import { HiOutlineBars3BottomRight, HiOutlineXMark } from "react-icons/hi2";
import { useTheme } from "@/hooks/useTheme";

import Logo from "@/assets/logo.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";

interface NavItems {
  label: string;
  path: string;
}

const navItems: NavItems[] = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "Favorites",
    path: "/favorites",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-fg-brand font-semibold"
        : "text-heading hover:text-fg-brand"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-default bg-background">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <img
            src={Logo}
            alt="Employee Directory Logo"
            className="h-8 w-8 object-contain sm:h-10 sm:w-10"
          />
          <span className="hidden text-lg font-semibold text-heading sm:inline">
            Employee Directory
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <nav>
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink className={linkClass} to={item.path} end>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <Button
            variant="outline"
            size="icon"
            aria-label="Toogle Theme"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <LuSun className="text-lg" />
            ) : (
              <LuMoon className="text-lg" />
            )}
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="outline"
            size="icon"
            aria-label="Toggle Theme"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <LuSun className="text-lg" />
            ) : (
              <LuMoon className="text-lg" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <HiOutlineXMark size={22} />
            ) : (
              <HiOutlineBars3BottomRight size={22} />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute inset-x-0 top-16 border-t border-default bg-background md:hidden">
          <nav className="mx-auto max-w-screen-xl px-4 py-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2 transition-colors ${
                        isActive
                          ? "bg-brand/10 text-fg-brand font-semibold"
                          : "text-heading hover:bg-neutral-secondary-soft"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
