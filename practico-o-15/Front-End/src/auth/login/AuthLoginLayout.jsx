import { Link } from "react-router-dom";

export const AuthLoginLayout = ( { handleSubmit, onInputChange } ) => {
    return (
        <form method="POST" action="http://localhost:8080/api/auth" onSubmit={ handleSubmit }
              className="container w-25 mt-5">
            <h3>Sign In</h3>
            <div><p>You don't have an account? <Link to='/register'>Signup here !</Link></p></div>
            <div className="mb-3">
                <label>Email address</label>
                <input
                    onChange={ onInputChange }
                    name='userAuth'
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    onChange={ onInputChange }
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    )
}
