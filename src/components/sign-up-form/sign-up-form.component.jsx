import React from "react";
import "./sign-up-form.styles.scss";

import { useState, useContext } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";

const defaultFormFeilds = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFeilds);
    const { displayName, email, password, confirmPassword } = formFields;
    const { setCurrentUser } = useContext(UserContext);

    const resetformFields = () => {
        setFormFields(defaultFormFeilds);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password.trim() !== confirmPassword.trim()) {
            alert("Password doesn't match");
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            setCurrentUser(user);
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("User already exists.");
            }
            console.log("User creation related error", error);
        }
        resetformFields();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        // name can be displayName,email,password,conformPassword
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your username and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />

                <Button buttonType="inverted" type="submit">
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default SignUpForm;
