import { signOut } from 'firebase/auth';
import { BsCart3} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Utilities
import { auth } from '../../config/firebase.config';
import { selectProductsCount } from '../../store/reducers/cart/cart.selector';
import useAppSelector from '../hooks/redux.hooks';

// Styles
import { HeaderContainer, HeaderItems, HeaderItem, HeaderTitle } from './header.styles';
import { toggleCart } from '../../store/reducers/cart/cart.actions';

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  //const { isAuthenticated } = useContext(UserContext);
  //const { isAuthenticated } = useSelector((rootReducer: any) => rootReducer.userReducer);
  const { isAuthenticated } = useAppSelector((rootReducer) => rootReducer.userReducer);
  //const { productsCount, toggleCart } = useContext(CartContext);
  //onst { productsCount } = useContext(CartContext);
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
    //dispatch(logoutUser());
    dispatch({ type: 'LOGOUT_USER' });
    signOut(auth);
  }

  const handleCartClick = () => {
    dispatch(toggleCart());
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
          <HeaderItem onClick={handleCartClick}>
            <BsCart3 size={25} />
            <p style={ { marginLeft: 5 } }> {productsCount}</p>
          </HeaderItem>
        </HeaderItems>
      </ HeaderContainer>
  );
};

export default Header;