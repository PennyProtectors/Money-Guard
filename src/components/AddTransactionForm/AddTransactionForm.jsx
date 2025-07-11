import React, { useState } from "react";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field } from "formik";

// Styles
import css from "./AddTransactionForm.module.css";

// Icons
import { FaPlus, FaMinus } from "react-icons/fa";

// Validation schema
const schema = yup.object().shape({
  amount: yup
    .number()
    .typeError("Please enter the number")
    .required("Amaount required"),
  date: yup.date().required("Date required"),
  comment: yup.string().required("Comment required"),
  type: yup.string().required(),
  category: yup.string(),
});

const AddTransactionForm = ({ onClose }) => {
  const [income, setIncome] = useState(false);

  return (
    <Formik
      validationSchema={schema}
      onSubmit={() => {}}
      initialValues={{
        type: income ? "income" : "expense",
        amount: "",
        date: new Date(),
        comment: "",
      }}
    >
      <Form className={css.TransactionForm}>
        <div className={css.FormRow}>
          <h3 className={css.FormTitle}>Add Transaction</h3>
        </div>
        <div className={css.FormRow}>
          <label
            htmlFor="incomeTrans"
            className={
              income === true
                ? [css.switchLabel, css.incomeLabel]
                : css.switchLabel
            }
          >
            Income
          </label>
          <div className={css.switchBox}>
            {income === true ? (
              <div
                onClick={() => setIncome(false)}
                className={[css.incomeSwitch, css.switchIcon].join(" ")}
              >
                <FaPlus className={css.icon} />
              </div>
            ) : (
              <div
                onClick={() => setIncome(true)}
                className={[css.expenceSwitch, css.switchIcon].join(" ")}
              >
                <FaMinus className={css.icon} />
              </div>
            )}
          </div>
          <label
            htmlFor="expenceTrans"
            className={
              income === false
                ? [css.switchLabel, css.expenceLabel]
                : css.switchLabel
            }
          >
            Expence
          </label>
        </div>
        <div className={css.FormRow}>
          <Field
            type="number"
            name="amount"
            className={css.FormInput}
            placeholder={"0.00"}
          />
          <Field
            type="date"
            name="date"
            className={css.FormInput}
            placeholder={"07.07.2023"}
          />
        </div>
        <div className={css.FormRow}>
          <textarea
            name="comment"
            className={[css.FormInput, css.FormInputText].join(" ")}
            placeholder="Comment"
            rows={4}
          ></textarea>
        </div>
        <div className={css.FormRow}>
          <button
            type="submit"
            className={[css.FormButton, css.submitButton].join(" ")}
          >
            ADD
          </button>
        </div>
        <div className={css.FormRow}>
          <button
            type="submit"
            onClick={() => onClose()}
            className={css.FormButton}
          >
            CANCEL
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default AddTransactionForm;
