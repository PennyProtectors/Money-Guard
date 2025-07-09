import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import * as yup from "yup";
import { editTransaction } from "../../redux/transactions/operations";
import css from "./EditTransactionForm.module.css";
import "react-datepicker/dist/react-datepicker.css";

const validationSchema = yup.object().shape({
  amount: yup
    .number()
    .typeError("Please enter a valid number")
    .positive("Amount must be positive")
    .required("Amount is required"),
  comment: yup
    .string()
    .max(50, "Max 50 characters")
    .required("Comment is required"),
  date: yup.date().required("Date is required"),
});

const EditTransactionForm = ({ transaction, onClose }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      type: transaction?.type || "Income",
      amount: transaction?.amount || "",
      comment: transaction?.comment || "",
      date: transaction?.date ? new Date(transaction.date) : new Date(),
    },
  });

  const onSubmit = async (data) => {
    try {
      const formattedDate = data.date.toISOString().split("T")[0];

      await dispatch(
        editTransaction({
          id: transaction.id,
          ...data,
          date: formattedDate,
          type: transaction.type,
        })
      ).unwrap();

      onClose(true);
    } catch (err) {
      setError("server", {
        type: "manual",
        message: err.message || "Something went wrong",
      });
    }
  };

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={() => onClose(false)}>
          &times;
        </button>
        <h2>Edit Transaction</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <label>
            Amount
            <input type="number" step="0.01" {...register("amount")} />
            {errors.amount && (
              <p className={css.error}>{errors.amount.message}</p>
            )}
          </label>

          <label>
            Comment
            <input type="text" {...register("comment")} />
            {errors.comment && (
              <p className={css.error}>{errors.comment.message}</p>
            )}
          </label>

          <label>
            Date
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="yyyy-MM-dd"
                  className={css.datepicker}
                />
              )}
            />
            {errors.date && <p className={css.error}>{errors.date.message}</p>}
          </label>

          {errors.server && (
            <p className={css.error}>{errors.server.message}</p>
          )}

          <div className={css.buttons}>
            <button type="submit" className={css.saveBtn}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelBtn}
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionForm;
