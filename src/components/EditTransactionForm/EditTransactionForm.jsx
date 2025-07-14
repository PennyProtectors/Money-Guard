import React, { useEffect, useState } from "react";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

// Styles
import css from "../AddTransactionForm/AddTransactionForm.module.css";

// Icons
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch } from "react-redux";

// Operations
import { editTransaction } from "../../redux/transactions/operations";

const EditTransactionForm = ({ data, onClose }) => {
  const dispatch = useDispatch();
  const [income, setIncome] = useState(false);
  useEffect(() => {
    if (data) {
      setIncome(data.type === "INCOME");
    }
  }, [data]);
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
      transactionDate: values.transactionDate,
      amount: income
        ? Math.abs(Number(values.amount))
        : -Math.abs(Number(values.amount)),
      comment: values.comment,
      type: income ? "INCOME" : "EXPENSE",
      categoryId: income
        ? "063f1132-ba5d-42b4-951d-44011ca46262"
        : values.categoryId,
      transactionId: data.id,
    };

    dispatch(editTransaction(transaction))
      .unwrap()
      .then(() => {
        actions.resetForm();
        onClose();
        toast.success("İşlem başarıyla güncellendi");
      })
      .catch((error) => {
        toast.error(error || "İşlem güncellenirken bir hata oluştu");
      });
  };

  // const categoriesData = useSelector((state) => state.transaction.category);
  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        amount: data ? Math.abs(Number(data.amount)) : "",
        transactionDate: data
          ? data.transactionDate
          : new Date().toISOString().split("T")[0],
        comment: data ? data.comment : "",
        type: data ? (data.type === "INCOME" ? "INCOME" : "EXPENSE") : "INCOME",
        categoryId: data ? data.categoryId : "",
      }}
    >
      <Form className={css.TransactionForm}>
        <div className={css.FormRow}>
          <h3 className={css.FormTitle}>Edit Transaction</h3>
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
          /
          <label
            htmlFor="expenseTrans"
            className={
              income === false
                ? [css.switchLabel, css.expenseLabel].join(" ")
                : css.switchLabel
            }
          >
            Expense
          </label>
        </div>
        <div className={css.FormRow}>
          <p className={css.FormInput}> {data.category} </p>
        </div>
        {/* <div className={css.FormRow}>
            {income === false ? (
              <Field
                as="select"
                name="categoryId"
                className={[css.FormInput, css.selectInput].join(" ")}
                placeholder="Select Category"
                hidden
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
          </div> */}

        <div className={css.FormDateAndAmountGroup}>
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
            Save
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

export default EditTransactionForm;
