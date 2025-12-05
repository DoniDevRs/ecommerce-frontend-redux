import { signOut } from 'firebase/auth';
import { BsCart3} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Utilities
import { auth } from '../../config/firebase.config';

// Styles
import { HeaderContainer, HeaderItems, HeaderItem, HeaderTitle } from './header.styles';
import { CartContext } from '../../contexts/cart.context';

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  //const { isAuthenticated } = useContext(UserContext);
  //const { isAuthenticated } = useSelector((rootReducer: any) => rootReducer.userReducer);
  const { isAuthenticated } = useSelector((rootReducer: any) => rootReducer.userReducer);
  const { productsCount, toggleCart } = useContext(CartContext);

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
    dispatch({ type: 'LOGOUT_USER' });
    signOut(auth);
  }

  return (
    <HeaderContainer>
      <h2>
        <HeaderTitle onClick={handleLogoClick}>CLUB CLOTHING</HeaderTitle>
      </h2>
        <HeaderItems>
          <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
          {!isAuthenticated && (
            <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignUpClick}>Criar conta</HeaderItem>
            </>
          )}

          {isAuthenticated && (
            <HeaderItem onClick={handleSignOutClick}>Sair</HeaderItem>
          )
            }
          <HeaderItem onClick={toggleCart}>
            <BsCart3 size={25} />
            <p style={ { marginLeft: 5 } }> {productsCount}</p>
          </HeaderItem>
        </HeaderItems>
      </ HeaderContainer>
  );
};

export default Header;