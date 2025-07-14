import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import css from "./LoginForm.module.css";
import logo from "../../assets/images/Logo-Mobile.png";
import { MdEmail, MdLock } from "react-icons/md";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const logInSchema = Yup.object().shape({
    email: Yup.string().email("Must be valid email!").required("Required!"),
    password: Yup.string()
      .min(6, "Password is too short! Should be 6 chars minimum.")
      .max(12, "Password is too long! Should be 12 chars maximum.")
      //   .matches(
      //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      //     "Password contain at least one letter, one number, and one special character"
      //   )
      .required("Required!"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(logIn(values));
    console.log(values);
    resetForm();
  };

  return (
    <div className={css.LoginPage}>
      <div className={css.LoginPage_Area}>
        <div className={css.LoginPage_Header}>
          <img src={logo} alt="Money Guard" className={css.LoginPage_Logo} />
          <h1 className={css.LoginPage_Title}>Money Guard</h1>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={logInSchema}
        >
          <Form className={css.LoginPage_Form}>
            <div className={css.LoginPage_Form_Group}>
              <MdEmail className={css.LoginPage_Icon} />
              <Field
                type="email"
                name="email"
                placeholder="E-mail"
                className={css.LoginPage_Input}
              />
            </div>
            <ErrorMessage
              name="email"
              component="span"
              className={css.LoginPage_Form_ErrorMessage}
            />
            <div className={css.LoginPage_Form_Group}>
              <MdLock className={css.LoginPage_Icon} />
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={css.LoginPage_Input}
              />
            </div>
            <ErrorMessage
              name="password"
              component="span"
              className={css.LoginPage_Form_ErrorMessage}
            />
            <button
              type="submit"
              className={[
                css.LoginPage_Button,
                css.LoginPage_Button_Submit,
              ].join(" ")}
            >
              Log In
            </button>
            <button
              onClick={() => {
                navigate("/register", { replace: false });
              }}
              type="button"
              className={css.LoginPage_Button}
            >
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
