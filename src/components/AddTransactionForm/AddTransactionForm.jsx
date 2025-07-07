import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Validation schema
const schema = yup.object().shape({
    amount: yup.number().typeError('Please enter the number').required('Amaount required'),
    date: yup.date().required('Date required'),
    comment: yup.string().required('Comment required'),
    type: yup.string().required(),
    category: yup.string(),
});

const AddTransactionForm = ({ onClose }) => {
    const [transactionType, setTransactionType] = useState('Income');

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            type: 'Income',
            amount: '',
            date: new Date(),
            comment: '',
        }
    });

    const onSubmit = (data) => {
        console.log('Gönderilen veri:', data);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* Toggle butonlar */}
            <div>
                {/* Income butonu */}
                <button
                    type="button"
                    onClick={() => {
                        setValue('type', 'Income');
                        setTransactionType('Income');
                    }}
                >
                    + Income
                </button>

                {/* Expense butonu */}
                <button
                    type="button"
                    onClick={() => {
                        setValue('type', 'Expense');
                        setTransactionType('Expense');
                    }}
                >
                    - Expense
                </button>
            </div>

            {/* Gider veya gelir kategori */}
            {transactionType === 'Expense' && (
                <div>
                    <label>Category</label>
                    <select {...register('category')}>
                        <option value="">Main expenses</option>
                        <option value="Food">Products</option>
                        <option value="Rent">Car</option>
                        <option value="SelfCare">Self care</option>
                        <option value="ChildCare">Child care</option>
                        <option value="HouseholdProducts">Household products</option>
                        <option value="Education">Education</option>
                        <option value="Leisure">Leisure</option>
                        <option value="OtherExpenses">Other expenses</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>
                    {errors.category && <p>{errors.category.message}</p>}
                </div>
            )}

            {/* Tutar */}
            <div>
                <label>Tutar</label>
                <input type="number" {...register('amount')} />
                {errors.amount && <p>{errors.amount.message}</p>}
            </div>

            {/* Tarih */}
            <div>
                <label>Tarih</label>
                <DatePicker
                    selected={getValues('date')}
                    onChange={(date) => setValue('date', date)}
                />
                {errors.date && <p>{errors.date.message}</p>}
            </div>

            {/* Yorum */}
            <div>
                <label>Yorum</label>
                <input {...register('comment')} />
                {errors.comment && <p>{errors.comment.message}</p>}
            </div>

            {/* İşlem ve iptal */}
            <div>
                <button type="submit">Ekle</button>
                <button type="button" onClick={onClose}>İptal</button>
            </div>
        </form>
    );
};

export default AddTransactionForm;