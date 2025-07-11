import React, { useDebugValue, useState } from "react";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field } from "formik";

// Styles
import css from "./AddTransactionForm.module.css";

// Icons
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../../redux/transactions/operations";

// Validation schema
const schema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Please enter the number")
    .required("Amaount required"),
  transactionDate: Yup.date().required("Date required"),
  comment: Yup.string().required("Comment required"),
  type: Yup.string().required(),
  categoryId: Yup.string(),
});

const AddTransactionForm = ({ onClose }) => {
  const categories = useSelector((state) => state.transaction.category);
  const dispatch = useDispatch();

  const [income, setIncome] = useState(false);
  // const handleSubmit = (values) => {
  //   console.log("Form submitted with values:", values);
  //   dispatch(addTransaction());
  //   // onclose();
  // };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values.date);

    const transaction = {
      transactionDate: new Date().toISOString().split("T")[0],
      amount: income
        ? Math.abs(Number(values.amount))
        : -Math.abs(Number(values.amount)),
      comment: values.comment,
      type: income ? "INCOME" : "EXPENSE",
      categoryId: values.categoryId,
    };

    dispatch(addTransaction(transaction))
      .unwrap()
      .then(() => {
        resetForm();
        onClose();
      })
      .catch((error) => {
        console.error("Transaction eklenemedi:", error);
      });
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        amount: "",
        transactionDate: new Date().toISOString().split("T")[0],
        comment: "",
        type: income ? "INCOME" : "EXPENSE",
        categoryId: "",
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
            INCOME
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
            EXPENSE
          </label>
        </div>

        <div className={css.FormRow}>
          <Field as="select" name="categoryId" className={css.FormInput}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Field>

          <Field
            type="number"
            name="amount"
            className={css.FormInput}
            placeholder={"0.00"}
          />
          <Field
            type="date"
            name="transactionDate"
            className={css.FormInput}
            placeholder={"07.07.2023"}
          />
        </div>
        <div className={css.FormRow}>
          <Field
            as="textarea"
            name="comment"
            className={[css.FormInput, css.FormInputText].join(" ")}
            placeholder="Comment"
            rows={4}
          />
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
            type="reset"
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
