import axios from 'axios'
import { FunctionComponent, useState } from 'react'
import { BsBagCheck } from 'react-icons/bs'

// Utilities
import useAppSelector from '../hooks/redux.hooks'
import { selectProductsTotalPrice } from '../../store/toolkit/cart/cart.selectors';

// Components
import CartItem from '../cart-item/cart-item.component'
import CustomButton from '../custom-button/custom-button.component'
import LoadingComponent from '../loading/loading.component'

// Styles
import {
  CheckoutContainer,
  CheckoutTitle,
  CheckoutProducts,
  CheckoutTotal
} from './checkout.styles'

const Checkout: FunctionComponent = () => {
  const productsTotalPrice = useAppSelector(selectProductsTotalPrice);

  const products = useAppSelector((state) => state.cartReducer.products);

  const [isLoading, setIsLoading] = useState(false);

  const handleFinishPurchaseClick = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/create-checkout-session`,
        { products }
      );
      console.log("Compra finalizada com sucesso:", data.url);

      window.location.href = data.url;
    } catch (error) {
      console.error("Erro ao finalizar a compra:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingComponent />}

      <CheckoutContainer>
        <CheckoutTitle>Checkout</CheckoutTitle>

        {products.length > 0 ? (
          <>
            <CheckoutProducts>
              {products.map((product: any) => (
                <CartItem key={product.id} product={product} />
              ))}
            </CheckoutProducts>

            <CheckoutTotal>Total: R${productsTotalPrice}</CheckoutTotal>

            <CustomButton
              startIcon={<BsBagCheck />}
              onClick={handleFinishPurchaseClick}
            >
              Complete Purchase
            </CustomButton>
          </>
        ) : (
          <p>Your cart is empty!</p>
        )}
      </CheckoutContainer>
    </>
  );
};

export default Checkout