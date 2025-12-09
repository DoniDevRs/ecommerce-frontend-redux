import { FunctionComponent } from 'react'
import { BsCartCheck } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// Utilities
import useAppSelector from '../hooks/redux.hooks'
import { toggleCart } from '../../store/toolkit/cart/cart.slice'
import { 
  selectProductsCount, 
  selectProductsTotalPrice } from '../../store/toolkit/cart/cart.selectors'

// Components
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'

// Styles
import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal
} from './cart.styles'
import CartProduct from '../../types/cart.type'

const Cart: FunctionComponent = () => {

  const { isVisible, products } = useAppSelector((rootReducer) => rootReducer.cartReducer);
  const productsTotalPrice = useAppSelector(selectProductsTotalPrice);
  const productsCount = useAppSelector(selectProductsCount);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleCheckoutClick = () => {
    navigate("/checkout");
    dispatch(toggleCart());
  }

  const handleEscapeAreaClick = () => {
    dispatch(toggleCart());
  }

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={handleEscapeAreaClick} />
      <CartContent>
        <CartTitle>Your Cart</CartTitle>

        {products.map((product: CartProduct) => (
          <CartItem key={product.id} product={product} />
        ))}

        {productsCount > 0 && (
          <CartTotal>Total: R${productsTotalPrice}</CartTotal>
        )}

        {productsCount > 0 && (
          <CustomButton startIcon={<BsCartCheck />} onClick={handleCheckoutClick}>
            Proceed to Checkout
          </CustomButton>
        )}

        {productsCount === 0 && (
          <p>Your cart is empty</p>
        )}

      </CartContent>
    </CartContainer>
  );
}

export default Cart