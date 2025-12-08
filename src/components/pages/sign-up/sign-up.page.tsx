import { FiLogIn} from "react-icons/fi";
import { useForm } from "react-hook-form";
import validator from "validator";
import { 
  AuthError, 
  createUserWithEmailAndPassword, 
  AuthErrorCodes } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//Components
import CustomButton from "../../custom-button/custom-button.component";
import CustomInput from "../../custom-input/custom-input.component";
import Header from "../../header/header.component";
import InputErrorMessage from "../../input-error-message/input-error-message.component";
import LoadingComponent from "../../loading/loading.component";

// Styles
import { 
  SignUpContainer, 
  SignUpContent, 
  SignUpHeadline,
   SignUpInputContainer } from "./sign-up.styles";

//Utilities
import { auth, db } from "../../../config/firebase.config";
import useAppSelector from "../../hooks/redux.hooks";

interface SignUpForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const SignUpPage = () => {
    const { register,
            formState: { errors }, 
            handleSubmit, 
            setError,
            watch } = useForm<SignUpForm>();

    const [isLoading, setIsLoading] = useState(false);

    const watchPassword = watch("password");     

    const { isAuthenticated } = useAppSelector((rootReducer) => rootReducer.userReducer);

    const navigate = useNavigate();

    useEffect(() => {
      if (isAuthenticated) {
        navigate("/");
      }
    }, [isAuthenticated, navigate]);

    const handleSubmitPress = async (data: SignUpForm) => {
        try {
          setIsLoading(true);

          const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password)

          await addDoc(collection(db, 'users'), {
            id: userCredentials.user.uid,
            firstName: data.firstName,
            lastName: data.lastName,
            email: userCredentials.user.email,
            provider: 'firebase',
          });

        } catch (error) {
            const _error = error as AuthError

            if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
                return setError('email', { type: 'alreadyInUse' });
            }
        } finally {
          setIsLoading(false);
        }
    }        

    return (
      <>
        <Header />

        {isLoading && <LoadingComponent />}
         
        <SignUpContainer>
          <SignUpContent>
            <SignUpHeadline>Create your account</SignUpHeadline>

            <SignUpInputContainer>
              <p>First Name</p>
              <CustomInput
                hasError={!!errors?.firstName}
                type="text"
                placeholder="Enter your first name"
                {...register("firstName", { required: true })}
              />

              {errors?.firstName?.type === "required" && 
              (<InputErrorMessage>First name is required</InputErrorMessage>)}

            </SignUpInputContainer>

            <SignUpInputContainer>
              <p>Last Name</p>
              <CustomInput
                hasError={!!errors?.lastName}
                type="text"
                placeholder="Enter your last name"
                {...register("lastName", { required: true })}
              />

                {errors?.lastName?.type === "required" && 
                (<InputErrorMessage>Last name is required</InputErrorMessage>)}
            </SignUpInputContainer>

            <SignUpInputContainer>
              <p>Email</p>
              <CustomInput
                hasError={!!errors?.email}
                type="text"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  validate: (value) => {
                    return validator.isEmail(value);
                  },
                })}
              />

                {errors?.email?.type === "required" && 
                (<InputErrorMessage>Email is required</InputErrorMessage>)}

                {errors?.email?.type === "alreadyInUse" && 
                (<InputErrorMessage>Email is already in use</InputErrorMessage>)}

                {errors?.email?.type === "validate" && 
                (<InputErrorMessage>Invalid email</InputErrorMessage>)}
            </SignUpInputContainer>

            <SignUpInputContainer>
              <p>Password</p>
              <CustomInput
                hasError={!!errors?.password}
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true, minLength: 6 })}
              />

                {errors?.password?.type === "required" && 
                (<InputErrorMessage>Password is required</InputErrorMessage>)}

                {errors?.password?.type === "minLength" && 
                (<InputErrorMessage>Password must be at least 6 characters</InputErrorMessage>)}  

            </SignUpInputContainer>

            <SignUpInputContainer>
              <p>Confirm Password</p>
              <CustomInput
                hasError={!!errors?.passwordConfirmation}
                type="password"
                placeholder="Enter your password again"
                {...register("passwordConfirmation", { required: true, minLength: 6, validate: (value) => {
                    return value === watchPassword;
                } })}
              />

                {errors?.passwordConfirmation?.type === "required" && 
                (<InputErrorMessage>Password confirmation is required</InputErrorMessage>)} 

                {errors?.passwordConfirmation?.type === "validate" && 
                (<InputErrorMessage>Passwords do not match</InputErrorMessage>)}    

                {errors?.passwordConfirmation?.type === "minLength" && 
                (<InputErrorMessage>Password confirmation must be at least 6 characters</InputErrorMessage>)} 

            </SignUpInputContainer>

            <CustomButton 
                onClick={() => handleSubmit(handleSubmitPress)()}
                startIcon={<FiLogIn size={18} />} >
              Create Account
            </CustomButton>
          </SignUpContent>
        </SignUpContainer>
      </>
    );
}

export default SignUpPage;