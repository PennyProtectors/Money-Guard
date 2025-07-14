import React, { useState } from "react";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field } from "formik";

// Styles
import css from "./AddTransactionForm.module.css";

// Icons
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

// Operations
import { addTransaction } from "../../redux/transactions/operations";
import toast from "react-hot-toast";

const AddTransactionForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [income, setIncome] = useState(false);

  // Validation schema
  const schema = yup.object().shape({
    amount: yup
      .number()
      .typeError("Please enter the number")
      .required("Amaount required"),
    transactionDate: yup.date().required("Date required"),
    comment: yup.string().required("Comment required"),
    type: yup.string().required(),
    categoryId: yup.string(),
  });

  const handleSubmit = (values, actions) => {
    const transaction = {
      transactionDate:
        values.transactionDate || new Date().toISOString().split("T")[0],
      amount: income
        ? Math.abs(Number(values.amount))
        : -Math.abs(Number(values.amount)),
      comment: values.comment,
      type: income ? "INCOME" : "EXPENSE",
      categoryId: income
        ? "063f1132-ba5d-42b4-951d-44011ca46262"
        : values.categoryId,
    };

    dispatch(addTransaction(transaction))
      .unwrap()
      .then(() => {
        actions.resetForm();
        onClose();
        toast.success("İşlem başarıyla eklendi");
      })
      .catch((error) => {
        toast.error(error || "İşlem eklenirken bir hata oluştu");
      });
  };

  const categoriesData = useSelector((state) => state.transaction.category);

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
                ? [css.switchLabel, css.incomeLabel].join(" ")
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
                className={[css.expenseSwitch, css.switchIcon].join(" ")}
              >
                <FaMinus className={css.icon} />
              </div>
            )}
          </div>
          <label
            htmlFor="expenseTrans"
            className={
              income === false
                ? [css.switchLabel, css.expenseLabel].join(" ")
                : css.switchLabel
            }
          >
            expense
          </label>
        </div>
        <div className={css.FormRow}>
          {income === false ? (
            <Field
              as="select"
              name="categoryId"
              className={[css.FormInput, css.selectInput].join(" ")}
              placeholder="Select Category"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categoriesData.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Field>
          ) : null}
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
          ></Field>
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
            type="button"
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
