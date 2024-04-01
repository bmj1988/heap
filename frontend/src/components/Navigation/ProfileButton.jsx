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

  const toMessageCenter = (e) => {
    e.preventDefault();
    navigate('/messages')
    closeMenu();
  }

  const toListingHistory = (e) => {
    e.preventDefault();
    navigate('/history');
    closeMenu();
  }

  const toOpenBids = (e) => {
    e.preventDefault();
    navigate('/current-bids');
    closeMenu();
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/")
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
                <div className="differentOptions topOption">
                {user.email}
                </div>
                <div className="breaker"></div>
                {user.owner ? <div className="profileOptions" onClick={toListingHub}>Listings</div> : null}
                {user.owner ? <div className="profileOptions" onClick={toShopHub}>Shops</div> : null}
                {user.agent ? <div className="profileOptions" onClick={toOpenBids}>Open bids</div> : null}
                <div className="profileOptions" onClick={toMessageCenter}>Messages</div>
                <div className="profileOptions" onClick={toListingHistory}>History </div>
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
