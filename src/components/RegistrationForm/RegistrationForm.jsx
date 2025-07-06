import { ErrorMessage, Field, Formik, Form } from "formik";
import React from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = async (values, { resetForm }) => {
    const { username, email, password } = values;
    const userData = { username, email, password }; // sadece gerekenler
    try {
      await dispatch(register(userData)).unwrap();
      resetForm();
      navigate("/login"); // Kayıt başarılıysa giriş sayfasına yönlendir
    } catch (error) {
      alert("Kayıt başarısız: " + error);
    }
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={registrationSchema}
      >
        {({ values }) => (
          <Form>
            <div>
              <Field type="text" name="username" placeholder="Name" />
              <ErrorMessage name="username" component="span" />
            </div>
            <div>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="span" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="span" />
            </div>
            <div>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
              />
              <ErrorMessage name="confirmPassword" component="span" />
              <PasswordStrengthBar password={values.password} />
            </div>
            <button type="submit">REGİSTER</button>
            <button type="button" onClick={() => navigate("/login")}>
              LOG IN
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registrations;
