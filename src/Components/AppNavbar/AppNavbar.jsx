import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import image from "../../assets/me.jpg";
import { Moon, Personalcard, Sun1 } from "iconsax-reactjs";
import classNames from "classnames";
import { useAudioPlayer } from "react-use-audio-player";
import { useEffect } from "react";
import mySound from "/public/audio/register-audio.mp3";
import { useLocation } from "react-router";
import { AuthTokenContext } from "../../Context/AuthTokenProvider/AuthTokenProvider";

export default function AppNavbar() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Lazy initialization
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("isDarkMode") === "true" || false;
  });

  const audio = useAudioPlayer();

  useEffect(() => {
    audio.load(mySound);
  }, []);

  useEffect(() => {
    // if isDarkMode is true add dark class to html element else remove it
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("isDarkMode", isDarkMode);
    isDarkMode ? handlePlay() : handlePause();
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((prev) => !prev);
  }

  function handlePlay() {
    audio.play();
  }
  
  function handlePause() {
    audio.pause();
  }

  isDarkMode ? handlePlay() : handlePause();

  const navigate = useNavigate();
  const { getUserData, userData } = useContext(AuthTokenContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    getUserData();
    navigate("/login");
  };

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="text-white opacity-95 bg-linear-to-r from-blue-500 to-indigo-600 dark:bg-linear-to-r dark:from-gray-800 dark:to-gray-900 transition-colors duration-400 ease-in-out"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Personalcard size="30" color="" variant="Outline" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarBrand as={Link} to="/">
          <Personalcard size="30" color="green" variant="Outline" />
        </NavbarBrand>
        <NavbarItem className="flex gap-4">
          {userData && (
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                classNames(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300",
                  isActive
                    ? "bg-gray-200 dark:bg-white text-gray-800 dark:text-gray-900"
                    : "text-white hover:bg-gray-200 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-100 transition-colors duration-400 ease-in-out",
                )
              }
            >
              Posts
            </NavLink>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {!userData && pathname !== "/register" && (
            <Button as={Link} color="secondary" to="/register" variant="shadow">
              Sign Up
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <div
        className={classNames(
          `flex gap-2 items-center p-2 rounded-full bg-indigo-300 dark:bg-gray-700 transition-colors duration-400 ease-in-out`,
        )}
      >
        {/* Button to dark mode */}
        <button
          className={classNames(
            "cursor-pointer rounded-full transition-colors duration-400 ease-in-out",
            isDarkMode || "bg-gray-300 p-1",
          )}
          onClick={(_) => toggleDarkMode()}
        >
          <Sun1 size="20" color="#FFF" variant="Outline" />
        </button>

        {/* Button to light mode */}
        <button
          className={classNames(
            "cursor-pointer rounded-full transition-colors duration-400 ease-in-out",
            isDarkMode && "bg-gray-300 p-1",
          )}
          onClick={(_) => toggleDarkMode()}
        >
          <Moon size="20" color="#FFF" variant="Outline" />
        </button>
      </div>

      <NavbarMenu className="text-white bg-linear-to-r from-blue-500 to-indigo-600 dark:bg-linear-to-r dark:from-gray-800 dark:to-gray-900 ">
        <NavbarMenuItem>
          {userData && (
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="/posts"
              className={({ isActive }) =>
                classNames(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300",
                  isActive
                    ? "bg-gray-200 dark:bg-white text-gray-800"
                    : "text-white hover:bg-gray-200 hover:text-gray-800",
                )
              }
            >
              Posts
            </NavLink>
          )}
        </NavbarMenuItem>
      </NavbarMenu>

      {userData && (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform cursor-pointer hover:scale-110"
              color="secondary"
              name="El-Sayed Mokdam"
              size="md"
              src={image}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2" textValue="El-Sayed Mokdam">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </Navbar>
  );
}
