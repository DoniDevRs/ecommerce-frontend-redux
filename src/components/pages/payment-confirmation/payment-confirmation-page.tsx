import { FunctionComponent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { 
  AiOutlineCheckCircle, 
  AiOutlineCloseCircle, 
  AiOutlineHome } from "react-icons/ai";
import { useDispatch } from "react-redux";

//styles
import {
  PaymetConfirmationContainer,
  PaymentConfirmationContent,
} from "./payment-confirmation.styles";

//Components
import Header from "../../header/header.component";
import CustomButton from "../../custom-button/custom-button.component";

//Utilities
import Colors from "../../../theme/theme.colors";
import { clearCartProducts } from "../../../store/toolkit/cart/cart.slice";

const PaymentConfirmationPage: FunctionComponent = () => {
    const dispatch = useDispatch();
    
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const status = searchParams.get("status");
    const isCanceled = searchParams.get("canceled") === "true" ; 

    useEffect(() => {  
        if (status === "true") {    
            dispatch(clearCartProducts());
        }
    }, [dispatch, status]);

    const handleGoToHomePageClick = () => {
      navigate("/");
    }   

    return (
      <>
        <Header />
        <PaymetConfirmationContainer>
          <PaymentConfirmationContent>
            {status === "true" && (
              <>
                <AiOutlineCheckCircle size={120} color={Colors.success} />
                <p>Sua compra foi finalizada com sucesso.</p>
              </>
            )}
            {(status === "false" || isCanceled) &&  (
              <>
                <AiOutlineCloseCircle size={120} color={Colors.error} />
                <p>
                  Ocorreu um erro ao finalizar sua compra, Por favor tente
                  novamente.
                </p>
              </>
            )}

            <CustomButton startIcon={<AiOutlineHome />} onClick={handleGoToHomePageClick}>
            Ir para a Página Inicial</CustomButton>
          </PaymentConfirmationContent>
        </PaymetConfirmationContainer>
      </>
    );
}

export default PaymentConfirmationPage;