import React from "react";
import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { signInWithGooglePopUp, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";
const defaultFormFeilds = {
    email: "",
    password: "",
};
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFeilds);
    const { email, password } = formFields;
    const resetformFields = () => {
        setFormFields(defaultFormFeilds);
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopUp();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect password for email");
                    break;
                case "auth/user-not-found":
                    alert("No user associated with this email");
                    break;
                default:
                    console.log(error);
            }
            console.log(error);
        }
        resetformFields();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        // name can be email,password
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
