import { signOut } from 'firebase/auth';
import { BsCart3} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Utilities
import { auth } from '../../config/firebase.config';
import { toggleCart } from '../../store/toolkit/cart/cart.slice';
import { logoutUser } from '../../store/toolkit/user/user.slice';
import { selectProductsCount } from '../../store/toolkit/cart/cart.selectors';
import useAppSelector from '../hooks/redux.hooks';

// Styles
import { 
  HeaderContainer, 
  HeaderItems, 
  HeaderItem, 
  HeaderTitle } from './header.styles';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useAppSelector((rootReducer) => rootReducer.userReducer);
  const productsCount = useAppSelector(selectProductsCount);

  const handleLogoClick = () => {
    navigate("/");
  }

  const handleLoginClick = () => { 
    navigate("/login");
  }

  const handleSignUpClick = () => {
    navigate("/sign-up");
  }

  const handleExploreClick = () => {
    navigate("/explore");
  }

  const handleSignOutClick = () => {
    dispatch(logoutUser());
    signOut(auth);
  }

  const handleCartClick = () => {
    dispatch(toggleCart());
  }

  return (
    <HeaderContainer>
      <h2>
        <HeaderTitle onClick={handleLogoClick}>SHOP CLOTHING</HeaderTitle>
      </h2>
        <HeaderItems>
          <HeaderItem onClick={handleExploreClick}>Explore</HeaderItem>
          {!isAuthenticated && (
            <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignUpClick}>Create Account</HeaderItem>
            </>
          )}

          {isAuthenticated && (
            <HeaderItem onClick={handleSignOutClick}>Sign Out</HeaderItem>
          )
            }
          <HeaderItem onClick={handleCartClick}>
            <BsCart3 size={25} />
            <p style={ { marginLeft: 5 } }> {productsCount}</p>
          </HeaderItem>
        </HeaderItems>
      </ HeaderContainer>
  );
};

export default Header;