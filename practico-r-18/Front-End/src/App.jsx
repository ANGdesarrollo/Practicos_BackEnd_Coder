import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SocketsProvider } from "./context/ContextProvider.jsx";
import { NavBar } from "./components/navbar/NavBar";
import { HomeContainer, InfoContainer } from "./pages/index.js";
import { Route, Routes } from "react-router-dom";
import { AuthLoginContainer, AuthRegisterContainer, Error } from "./auth/index.js";
import { RandomContainer } from "./pages/randoms/RandomContainer";
import { ChatContainer } from "./pages/chat/ChatContainer";
import { CartContainer } from "./pages/cart/CartContainer";
function App() {
    return (

            <SocketsProvider>
                <NavBar/>
                <Routes>
                    <Route path='/register' element={ <AuthRegisterContainer/> }></Route>
                    <Route path='/login' element={ <AuthLoginContainer/> }></Route>
                    <Route path='/home' element={ <HomeContainer/> }></Route>
                    <Route path='/chat' element={ <ChatContainer/> }></Route>
                    <Route path='/cart' element={<CartContainer/>}></Route>
                    <Route path="/errorRegister"
                           element={ <Error text={ 'Error at registering the user, please try again' }
                                            path={ '/register' }/> }></Route>
                    <Route path="/errorLogin"
                           element={ <Error text="Error to log in, please try it again" path={ '/login' }/> }></Route>
                    <Route path="/info" element={ <InfoContainer/> }></Route>
                    <Route path="/random/:number" element={ <RandomContainer/> }></Route>
                    <Route path="/*" element={ <AuthRegisterContainer/> }></Route>

                </Routes>
            </SocketsProvider>

    )
}

export default App
