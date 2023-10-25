import '../styles/ModalCreateUser.css';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TRows, TSetModal } from '../types';
import { createNewUser, editUser } from '../api/tableApi';
import { useDispatch } from 'react-redux';
import { fetchTable } from '../thunk/fetchTable';

export default function ModalCreateUser({ setModal, currentRow }: TSetModal) {
  const [defaultDateValue, setDefaultDateValue] = useState<string | null>(null);
  const dispatch = useDispatch();

  const mailRegx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneRegx = /^[0-9]+$/gi;
  let userSchema = yup.object({
    name: yup.string().required('First name is required field'),
    email: yup
      .string()
      .required('Email is required field')
      .matches(mailRegx, 'Enter valid email'),
    birthday_date: yup.string().required('Birthdate is required field'),
    phone_number: yup
      .string()
      .matches(phoneRegx, 'Phone number has to contain only integers')
      .min(6, 'Phone number length has to be from 6 to 13 integers')
      .max(13, 'Phone number length has to be from 6 to 13 integers')
      .required('Phone number is required field'),
    address: yup.string().required('Address is required field'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  function onSubmit(userToAdd: TRows): void {
    if (currentRow?.id) {
      editUser(currentRow.id, userToAdd);
    } else {
      createNewUser(userToAdd);
    }
    dispatch(fetchTable() as any);
    setModal(false);
  }

  const handleCloseModal = () => {
    setModal(false);
  };

  const tempBirthDate: string[] | undefined =
    currentRow?.birthday_date.split('-');
  useMemo(() => {
    if (tempBirthDate) {
      const defaultYear =
        +tempBirthDate[2] > 23
          ? `19${tempBirthDate[2]}`
          : `20${tempBirthDate[2]}`;
      setDefaultDateValue(
        `${defaultYear}-${tempBirthDate[1]}-${tempBirthDate[0]}`
      );
    }
  }, []);

  return (
    <div className='modalContainer'>
      <svg
        onClick={handleCloseModal}
        width='34'
        height='34'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z'
          fill='currentColor'
        />
      </svg>
      <h2>Create New User</h2>
      <form className='createUserForm' onSubmit={handleSubmit(onSubmit)}>
        <label>Name*</label>
        <input
          defaultValue={currentRow ? currentRow.name : ''}
          {...register('name')}
        />
        <p className='errorMessage'>{errors.name?.message}</p>
        <label>Email*</label>
        <input
          defaultValue={currentRow ? currentRow.email : ''}
          {...register('email')}
        />
        <p className='errorMessage'>{errors.email?.message}</p>
        <label>Birthday Date*</label>
        <input
          defaultValue={defaultDateValue ? defaultDateValue : ''}
          type='date'
          {...register('birthday_date')}
        />
        <p className='errorMessage'>{errors.birthday_date?.message}</p>
        <label>Phone Number*</label>
        <input
          defaultValue={currentRow ? currentRow.phone_number : ''}
          type='text'
          {...register('phone_number')}
        />
        <p className='errorMessage'>{errors.phone_number?.message}</p>
        <label>Address*</label>
        <input
          defaultValue={currentRow ? currentRow.address : ''}
          type='text'
          {...register('address')}
        />
        <p className='errorMessage'>{errors.address?.message}</p>
        <button className='buttonsWithStyle'>Add new user</button>
      </form>
    </div>
  );
}
