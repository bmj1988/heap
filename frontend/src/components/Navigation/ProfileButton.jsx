import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const toListingHub = (e) => {
    e.preventDefault();
    navigate('/my-listings')
    closeMenu();
  }

  const toShopHub = (e) => {
    e.preventDefault();
    navigate('/my-shops')
    closeMenu();
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <div>
      <div onClick={toggleMenu}>
        <FaBars className="logo cursor-pointer" />
      </div>
      <div className="textmark">
        {showMenu && (
          <div className={"profile-dropdown"} ref={ulRef}>
            {user ? (
              <div>
                <div className="profileOptions topOption">
                  {user.firstName}
                </div>
                <div className="profileOptions">{user.email}</div>
                {user.owner ? <div className="profileOptions" onClick={toListingHub}>Manage Listings</div> : null}
                {user.owner ? <div className="profileOptions" onClick={toShopHub}>Manage Shops</div> : null}
                <div className="profileOptions bottomOption" onClick={logout}>Log Out</div>
              </div>
            ) : (
              <div>
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
