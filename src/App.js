import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "../src/routes/shop/shop.component.jsx";
import Checkout from "./routes/checkout/checkout.component";
import Home from "./routes/home/home.component";

import { setCurrentUser } from "./store/features/user/userSlice";

import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      const pickedUser = user && (({ accessToken, email }) => ({ accessToken, email }))(user);
      dispatch(setCurrentUser(pickedUser));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
