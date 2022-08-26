import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";

const Shop = () => {
    return <h1>SHOP COMPON ENT</h1>;
};
const Cart = () => {
    return <h1>Cart Component</h1>;
};
const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path="shop" element={<Shop />} />
                    <Route path="cart" element={<Cart />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
