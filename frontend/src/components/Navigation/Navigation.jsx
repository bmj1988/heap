import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import { LogoDiv } from "./LogoDiv";
import SearchBar from "./SearchBar";

function Navigation() {
  return (
    <div>
      <nav className="main">
        <LogoDiv />
        <SearchBar/>
        <ProfileButton />
      </nav>
    </div>
  );
}

export default Navigation;
