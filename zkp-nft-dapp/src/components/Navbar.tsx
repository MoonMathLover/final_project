import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NavLinks = () => {
  return (
    <>
      <NavLink to="/" className="p-3 text-white text-lg">
        Home
      </NavLink>
      <NavLink to="/" className="p-3 text-white text-lg">
        About
      </NavLink>
      <NavLink to="/" className="p-3 text-white text-lg">
        GitHub
      </NavLink>
      <NavLink to="/" className="p-3 text-white text-lg">
        Contract
      </NavLink>
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex w-1/3 justify-end">
        <div className="hidden w-full justify-between md:flex">
          <NavLinks />
        </div>
        <div className="md:hidden">
          <button onClick={toggleNavbar}>
            {isOpen ? <X color="white"></X> : <Menu color="white"></Menu>}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex flex-col items-center basis-full">
          <NavLinks />
        </div>
      )}
    </>
  );
};

export default Navbar;
