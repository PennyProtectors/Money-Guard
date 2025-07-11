import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import style from "./AddTransactionForm.module.css"

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

            <div className={style.toggleContainer} >
                {/* Income Yazısı */}
                <span style={{ color: transactionType === 'Income' ? '#fff' : '#AAA', fontWeight: 'bold' }}>Income</span>
                {/* RENKLERİ KONTROL ETT !! */}

                {/* Switch */}
                <label className={style.switchLabel}>
                    <input
                        type="checkbox"
                        checked={transactionType === 'Expense'}
                        onChange={() => {
                            if (transactionType === 'Income') {
                                setTransactionType('Expense');
                                setValue('type', 'EXPENSE'); // formdaki 'type' güncelle
                            } else {
                                setTransactionType('Income');
                                setValue('type', 'INCOME');
                            }
                        }}
                        className={style.switchInput}
                    />

                    {/* Switch Grafik */}
                    <span style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: transactionType === 'Income' ? '#ccc' : '#FFB627',
                        borderRadius: '25px',
                        transition: 'background-color 0.2s'
                    }}>
                        {/* Kaydırıcı (toggle knob) */}
                        <span style={{
                            position: 'absolute',
                            top: '2px',
                            left: transactionType === 'Income' ? '2px' : '26px',
                            width: '22px',
                            height: '22px',
                            background: '#fff',
                            borderRadius: '50%',
                            transition: 'left 0.2s'
                        }} />
                    </span>
                    {/* RENKLERİ KONTROL ETT !! */}
                </label>

                {/* Expense Yazısı */}
                <span style={{ color: transactionType === 'Expense' ? '#fff' : '#AAA', fontWeight: 'bold' }}>Expense</span>
                {/* RENKLERİ KONTROL ETT !! */}

            </div>


            {/* Gider veya gelir kategori */}
            {transactionType === 'Expense' && (
                <div>
                    {/* <label>Category</label> */}
                    <select className={style.dropdown} {...register('category')}>
                        <option value="">Select a category</option>
                        <option value="MainExpenses">Main expenses</option>
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
            <div className={style.amountDiv}>
                {/* <label>Tutar</label> */}
                <input type="number" {...register('amount')} />
                {errors.amount && <p>{errors.amount.message}</p>}
            </div>

            {/* Tarih */}
            <div className={style.dateDiv}>
                {/* <label>Tarih</label> */}
                <DatePicker
                    selected={getValues('date')}
                    onChange={(date) => setValue('date', date)}
                />
                {errors.date && <p>{errors.date.message}</p>}
            </div>

            {/* Yorum */}
            <div className={style.commentDiv}>
                <label >Comment</label>
                <input {...register('comment')} />
                {errors.comment && <p>{errors.comment.message}</p>}
            </div>

            {/* İşlem ve iptal */}
            <div>
                <button className={style.addBtn} type="submit">ADD</button>
                <button className={style.closeBtn} type="button" onClick={onClose}>CANCEL</button>
            </div>
        </form>
    );
};

export default AddTransactionForm;