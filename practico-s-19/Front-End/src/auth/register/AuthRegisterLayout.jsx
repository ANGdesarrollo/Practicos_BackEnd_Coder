import { Link } from "react-router-dom";
import IntlTelInput from "react-intl-tel-input";
import 'react-intl-tel-input/dist/main.css';
import React, { useEffect, useState } from "react";

export const AuthRegisterLayout = ( { onInputChange, onSubmitRegister, handlePhoneNumberChange } ) => {

    const onlyNumbersRegex = /^[0-9]*$/;
    return (
        <form onSubmit={ onSubmitRegister } className="container w-25 mt-5">
            <h3>Register</h3> <p>Ya estás registrado? <Link to="/login">¡Logueate aqui!</Link></p>
            <div className="mb-3">
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        onChange={ onInputChange }
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        required={ true }
                    />
                </div>
                <div className="mb-3">
                    <label>Address</label>
                    <input
                        onChange={ onInputChange }
                        name="address"
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        required={ true }
                    />
                </div>
                <div className="mb-3">
                    <label>Age</label>
                    <input
                        onChange={ onInputChange }
                        name="age"
                        type="number"
                        className="form-control"
                        placeholder="Age"
                        required={ true }
                    />
                </div>
                <div className="mb-3 d-flex flex-column">
                    <label>Phone Number</label>
                    <IntlTelInput
                        inputProps={ { pattern: onlyNumbersRegex, name: "phone" } }
                        containerClassName="intl-tel-input"
                        inputClassName="form-control"
                        onPhoneNumberChange={ handlePhoneNumberChange }
                    />
                </div>
                <div className="mb-3">
                    <label>Photo or Avatar</label>
                    <input
                        onChange={ onInputChange }
                        name="avatar"
                        type="url"
                        className="form-control"
                        placeholder="Avatar"
                        required={ true }
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        onChange={ onInputChange }
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        required={ true }
                    />
                </div>
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
            <div className="mb-3">
                <label>Repeat password</label>
                <input
                    onChange={ onInputChange }
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
