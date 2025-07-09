import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
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
    resetForm;
  };

  return (
    <div className={css.loginContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={logInSchema}
      >
        <Form className={css.loginForm}>
          <div className={css.loginTitle}>
            <img src={logo} alt="" />
            <p>Money Guard</p>
          </div>
          <div className={css.loginInputGroup}>
            <div className={css.loginInput}>
              <MdEmail className={css.loginInputIcon} />
              <Field
                className={css.loginInputField}
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <ErrorMessage
              name="email"
              component="span"
              className={css.loginErrorMessage}
            />
          </div>
          <div className={css.loginInputGroup}>
            <div className={css.loginInput}>
              <MdLock className={css.loginInputIcon} />
              <Field
                className={css.loginInputField}
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <ErrorMessage
              name="password"
              component="span"
              className={css.loginErrorMessage}
            />
          </div>
          <div className={css.loginButonGroup}>
            <button className={css.loginButon} type="submit">
              LOG IN
            </button>
            <button
              className={css.loginRegisterButon}
              type="button"
              onClick={() => navigate("/register")}
            >
              REGISTER
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
