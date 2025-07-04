import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { logIn } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

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
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={logInSchema}
      >
        <Form>
          <div>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="span" />
          </div>
          <div>
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="span" />
          </div>
          <button type="submit">LOG IN</button>
          <button type="button" onClick={() => navigate("/")}>
            REGISTER
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
