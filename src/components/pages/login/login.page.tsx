import { BsGoogle } from "react-icons/bs";
import { FiLogIn} from "react-icons/fi";
import { useForm } from "react-hook-form";
import validator from "validator";
import { getDocs, collection, query, where, addDoc } from "firebase/firestore";
import { 
  AuthError, 
  AuthErrorCodes, 
  signInWithEmailAndPassword, 
  signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import CustomButton from "../../custom-button/custom-button.component";
import Header from "../../header/header.component";
import CustomInput from "../../custom-input/custom-input.component";
import InputErrorMessage from "../../input-error-message/input-error-message.component";
import LoadingComponent from "../../loading/loading.component";

// Styles
import { 
  LoginContainer, 
  LoginHeadline, 
  LoginInputContainer, 
  LoginSubtitle, 
  LoginContent } from "./login.styles";

//Utilities
import { auth, db, googleProvider } from "../../../config/firebase.config";
import useAppSelector from "../../hooks/redux.hooks";
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
    const { isAuthenticated } = useAppSelector((rootReducer) => rootReducer.userReducer);

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
            <LoginHeadline>Sign in to Shop Clothing</LoginHeadline>

            <CustomButton 
            startIcon={<BsGoogle size={18}/>} 
            onClick={handleSignInWithGooglePress}> 
            Sign in with Google 
            </CustomButton>

            <LoginSubtitle>Or sign in with your email</LoginSubtitle>

            <LoginInputContainer> 
                <p>Email</p>
                <CustomInput 
                hasError={!!errors?.email} 
                type="email" placeholder="Enter your email" 
                {...register("email", {required: true, validate: (value) => {
                    return validator.isEmail(value);
                }})} />

                {errors?.email?.type === "required" && (<InputErrorMessage>Email is required</InputErrorMessage>)}

                {errors?.email?.type === "notFound" && (<InputErrorMessage>Email not found</InputErrorMessage>)}

                {errors?.email?.type === "validate" && (<InputErrorMessage>Invalid email</InputErrorMessage>)}

            </LoginInputContainer>
            <LoginInputContainer> 
                <p>Password</p>
                <CustomInput 
                hasError={!!errors?.password} 
                type="password" placeholder="Enter your password" 
                {...register("password", {required: true})} />

            {errors?.password?.type === "required" && (<InputErrorMessage>Password is required</InputErrorMessage>)}

            {errors?.password?.type === "mismatch" && (<InputErrorMessage>Password is invalid</InputErrorMessage>)}

            </LoginInputContainer>

             <CustomButton startIcon={<FiLogIn size={18}/>} onClick={() =>handleSubmit(handleSubmitPress)()}> Sign In </CustomButton>
          </LoginContent>
        </LoginContainer>
      </>
    );
}

export default LoginPage;