import { BsGoogle } from "react-icons/bs";
import { FiLogIn} from "react-icons/fi";
import { useForm } from "react-hook-form";
import validator from "validator";
import { getDocs, collection, query, where, addDoc } from "firebase/firestore";
import { AuthError, AuthErrorCodes, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import CustomButton from "../../custom-button/custom-button.component";
import Header from "../../header/header.component";
import CustomInput from "../../custom-input/custom-input.component";

// Styles
import { LoginContainer, LoginHeadline, LoginInputContainer, LoginSubtitle, LoginContent } from "./login.styles";
import InputErrorMessage from "../../input-error-message/input-error-message.component";

//Utilities
import { auth, db, googleProvider } from "../../../config/firebase.config";
import LoadingComponent from "../../loading/loading.component";
interface LoginForm {
    email: string;
    password: string;
}

const LoginPage = () => {
    const { register,
            formState: { errors }, 
            handleSubmit, 
            setError } = useForm<LoginForm>();

    const [isLoading, setIsLoading] = useState(false);        

    //const { isAuthenticated } = useContext(UserContext);  

    const { isAuthenticated } = useSelector((rootReducer: any) => rootReducer.userReducer);

    const navigate = useNavigate();
    
    useEffect(() => {
      if (isAuthenticated) {
        navigate("/");
      }
    }, [isAuthenticated, navigate]);

    const handleSubmitPress = async (data: LoginForm) => {
        try {
          setIsLoading(true);

          const userCredentials = await signInWithEmailAndPassword(auth, data.email, data.password)
          console.log(userCredentials);

        } catch (error) {
          const _error = error as AuthError

          if (_error.code === AuthErrorCodes.INVALID_PASSWORD) {
            return setError('password', { type: 'mismatch' });
          }

          if (_error.code === AuthErrorCodes.USER_DELETED) {
            return setError('email', { type: 'notFound' });
          }
        } finally {
          setIsLoading(false);
        }
    }    
    
    const handleSignInWithGooglePress = async () => {
      try {
        setIsLoading(true);

        const userCredentials = await signInWithPopup(auth, googleProvider);

        const querySnapshot = await getDocs(
          query(
            collection(db, "users"),
            where("id", "==", userCredentials.user.uid)
          )
        );

        const user = querySnapshot.docs[0]?.data();

        if (!user) {
          const firstName = userCredentials.user.displayName?.split(" ")[0];
          const lastName = userCredentials.user.displayName?.split(" ")[1]; 

          await addDoc(collection(db, "users"), {
            id: userCredentials.user.uid,
            email: userCredentials.user.email,  
            firstName: firstName,
            lastName: lastName,
            provider: 'google',
          });
        }
      } catch (error) {
        console.log(error); 
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <>
        <Header />

        {isLoading && <LoadingComponent />}

        <LoginContainer>
          <LoginContent>
            <LoginHeadline>Entre com a sua conta</LoginHeadline>

            <CustomButton 
            startIcon={<BsGoogle size={18}/>} 
            onClick={handleSignInWithGooglePress}> 
            Entrar com o Google 
            </CustomButton>

            <LoginSubtitle>Ou entre com seu e-mail</LoginSubtitle>

            <LoginInputContainer> 
                <p>E-mail</p>
                <CustomInput 
                hasError={!!errors?.email} 
                type="email" placeholder="Digite seu e-mail" 
                {...register("email", {required: true, validate: (value) => {
                    return validator.isEmail(value);
                }})} />

                {errors?.email?.type === "required" && (<InputErrorMessage>E-mail é obrigatório</InputErrorMessage>)}

                {errors?.email?.type === "notFound" && (<InputErrorMessage>E-mail não encontrado</InputErrorMessage>)}

                {errors?.email?.type === "validate" && (<InputErrorMessage>E-mail inválido</InputErrorMessage>)}

            </LoginInputContainer>
            <LoginInputContainer> 
                <p>Senha</p>
                <CustomInput 
                hasError={!!errors?.password} 
                type="password" placeholder="Digite sua senha" 
                {...register("password", {required: true})} />

            {errors?.password?.type === "required" && (<InputErrorMessage>Senha é obrigatória</InputErrorMessage>)}

            {errors?.password?.type === "mismatch" && (<InputErrorMessage>Senha é inválida</InputErrorMessage>)}

            </LoginInputContainer>

             <CustomButton startIcon={<FiLogIn size={18}/>} onClick={() =>handleSubmit(handleSubmitPress)()}> Entrar </CustomButton>
          </LoginContent>
        </LoginContainer>
      </>
    );
}

export default LoginPage;