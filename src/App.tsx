import { onAuthStateChanged } from "firebase/auth";
import { FunctionComponent, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";

// Pages
import HomePage from "./components/pages/home/home.page";
import LoginPage from "./components/pages/login/login.page";
import SignUpPage from "./components/pages/sign-up/sign-up.page";
import ExplorePage from "./components/pages/explore/explore.page";
import CheckoutPage from "./components/pages/checkout/checkout.page";
import CategoryDetailsPage from "./components/pages/category-details/category-details.page";

//Utilities
import { auth, db } from "./config/firebase.config";
import { userConverter } from "./converters/firestore.converter";
import useAppSelector from "./components/hooks/redux.hooks";
import { loginUser, logoutUser } from "./store/toolkit/user/user.slice";

// Components
import LoadingComponent from "./components/loading/loading.component";
import Cart from "./components/cart/cart.component";
import AuthenticationGuard from "./components/guards/authentication.guard";
import PaymentConfirmationPage from "./components/pages/payment-confirmation/payment-confirmation-page";


const App: FunctionComponent = () => {

  const [isInitializing, setIsInitializing] = useState(true);

  const dispatch = useDispatch();

  const { isAuthenticated } = useAppSelector((rootReducer) => rootReducer.userReducer);

  useEffect(() => { 
    onAuthStateChanged(auth, async (user) => {
    const isSigninOut = isAuthenticated && !user;

    if (isSigninOut) {
      dispatch(logoutUser());

      return setIsInitializing(false);
    }

    const isSigninIn = !isAuthenticated && user;

    if (isSigninIn) {
      const querySnapshot = await getDocs(
        query(
          collection(db, "users").withConverter(userConverter),
          where("id", "==", user.uid)
        )
      );

      const userFromFirestore = querySnapshot.docs[0]?.data();

       dispatch(loginUser(userFromFirestore))

      return setIsInitializing(false);
    }

    return setIsInitializing(false);
  });

  }, [dispatch, isAuthenticated]);

  if (isInitializing) return <LoadingComponent />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/category/:id" element={<CategoryDetailsPage />} />
         <Route
          path="/checkout"
          element={
            <AuthenticationGuard>
              <CheckoutPage />
            </AuthenticationGuard>
          }
        />
        <Route path='/payment-confirmation' element={<PaymentConfirmationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>

      <Cart />
    </BrowserRouter>
  );
}

export default App;
