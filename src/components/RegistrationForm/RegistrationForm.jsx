import { ErrorMessage, Field, Formik, Form } from "formik";
import React from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import css from "./RegistrationForm.module.css";
import { IoPerson } from "react-icons/io5";
import { MdEmail, MdLock } from "react-icons/md";
import logo from "../../assets/images/Logo-Mobile.png";

const Registrations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const registrationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too short!")
      .max(50, "Too long")
      .required("Required!"),
    email: Yup.string().email("Must be valid email!").required("Required!"),
    password: Yup.string()
      .min(6, "Password is too short! Should be 6 chars minimum.")
      .max(12, "Password is too long! Should be 12 chars maximum.")
      //   .matches(
      //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      //     "Password contain at least one letter, one number, and one special character"
      //   )
      .required("Required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const { username, email, password } = values;
    const userData = { username, email, password };
    console.log(userData);
    dispatch(register(userData));
    resetForm();
  };
  return (
    <div className={css.registerContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={registrationSchema}
      >
        {({ values }) => (
          <Form className={css.registerForm}>
            <div className={css.registerTitle}>
              <img src={logo} alt="" />
              <p>Money Guard</p>
            </div>
            <div className={css.registerInputGroup}>
              <div className={css.registerInput}>
                <IoPerson className={css.registerInputIcon} />
                <Field
                  className={css.registerInputField}
                  type="text"
                  name="username"
                  placeholder="Name"
                />
              </div>
              <ErrorMessage
                name="username"
                component="span"
                className={css.registerErrorMessage}
              />
            </div>
            <div className={css.registerInputGroup}>
              <div className={css.registerInput}>
                <MdEmail className={css.registerInputIcon} />
                <Field
                  className={css.registerInputField}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <ErrorMessage
                name="email"
                component="span"
                className={css.registerErrorMessage}
              />
            </div>
            <div className={css.registerInputGroup}>
              <div className={css.registerInput}>
                <MdLock className={css.registerInputIcon} />
                <Field
                  className={css.registerInputField}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <ErrorMessage
                name="password"
                component="span"
                className={css.registerErrorMessage}
              />
            </div>
            <div className={css.registerInputGroup}>
              <div className={css.registerInput}>
                <MdLock className={css.registerInputIcon} />
                <Field
                  className={css.registerInputField}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                />
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="span"
                className={css.registerErrorMessage}
              />
              <PasswordStrengthBar
                password={values.password}
                className={css.registerPasswordBar}
              />
            </div>
            <div className={css.registerButonGroup}>
              <button type="submit" className={css.registerButon}>
                REGİSTER
              </button>
              <button
                type="button"
                className={css.registerLogInButon}
                onClick={() => navigate("/login")}
              >
                LOG IN
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registrations;
