import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {SocketsProvider} from "./context/socket-context";
import {NavBar} from "./components/navbar/NavBar";
import {HomeContainer} from "./pages/index.js";
import {Route, Routes} from "react-router-dom";
import { AuthLoginContainer, AuthRegisterContainer, Error, } from "./auth/index.js";
import { InfoContainer } from "../../../practico-n-14/Front-End/src/pages/info/InfoContainer";

function App() {
    return (
        <SocketsProvider>
            <NavBar/>
            <Routes>
                <Route path='/register' element={<AuthRegisterContainer/>}></Route>
                <Route path='/login' element={<AuthLoginContainer/>}></Route>
                <Route path='/home' element={<HomeContainer/>}></Route>
                <Route path="/errorRegister" element={<Error text={'Error at registering the user, please try again'} path={'/register'}/>}></Route>
                <Route path="/errorLogin" element={<Error text="Error to log in, please try it again" path={'/login'}/>} ></Route>
                <Route path="/info" element={<InfoContainer/>}></Route>
                <Route path="/*" element={<AuthRegisterContainer/>}></Route>

            </Routes>
        </SocketsProvider>
    )
}

export default App
