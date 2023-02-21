import { Link } from "react-router-dom";

export const AuthRegisterLayout = ({onInputChange, onSubmitRegister}) => {

    return (
        <form onSubmit={onSubmitRegister} className="container w-25 mt-5">
            <h3>Register</h3> <p>Ya estás registrado? <Link to="/login">¡Logueate aqui!</Link></p>
            <div className="mb-3">
                <label>Email address</label>
                <input
                    onChange={onInputChange}
                    name='email'
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    onChange={onInputChange}
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                />
            </div>
            <div className="mb-3">
                <label>Repeat password</label>
                <input
                    onChange={onInputChange}
                    name="repeatPassword"
                    type="password"
                    className="form-control"
                    placeholder="Repeat password"
                />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    );
};
