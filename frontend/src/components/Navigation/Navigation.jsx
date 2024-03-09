import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { LogoDiv } from "./LogoDiv";
import SearchBar from "./SearchBar";
// import { useSelector } from "react-redux";

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
