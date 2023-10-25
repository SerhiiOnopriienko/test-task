import '../styles/TableContent.css';
import { useEffect, useState } from 'react';
import { fetchNext, fetchTable } from '../thunk/fetchTable';
import { useSelector, useDispatch } from 'react-redux';
import { TRows, TStore } from '../types';
import ModalCreateUser from './ModalCreateUser';
import { deleteUser } from '../api/tableApi';

export default function TableContent() {
  const [modal, setModal] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [currentRow, setCurrentRow] = useState<TRows | null>(null);

  const { results, count, next, previous } = useSelector(
    (store: TStore) => store.tableReducer
  );
  const nextPage = next?.split('/')[next?.split('/').length - 1];
  const previousPage = previous?.split('/')[previous?.split('/').length - 1];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTable() as any);
  }, []);

  const handleNextPage = () => {
    if (next === null) {
      return;
    }
    setPage(page + 10);
    dispatch(fetchNext(nextPage) as any);
  };
  const handPrevioustPage = () => {
    if (previous === null) {
      return;
    }
    setPage(page - 10);
    dispatch(fetchNext(previousPage) as any);
  };

  const getRow = (user: TRows) => {
    setCurrentRow(user);
    setModal(true);
  };

  const showModal = () => {
    setModal(!modal);
    setCurrentRow(null);
  };

  const handleDelete = (user: TRows) => {
    if (user && user.id) {
      deleteUser(user.id);
      dispatch(fetchTable() as any);
    }
  };

  return (
    <div className='tableContainer'>
      <div className='innerContainer'>
        <h1 className='mainHeader'>Test table</h1>
        <button className='buttonsWithStyle' onClick={showModal}>
          Add New User
        </button>
        {modal ? (
          <ModalCreateUser setModal={setModal} currentRow={currentRow} />
        ) : null}
        <div>
          <table className='tableTest'>
            <tbody>
              <tr className='tableHeader'>
                <th>Name</th>
                <th>Email</th>
                <th>Birth Date</th>
                <th>Phone Number</th>
                <th>Address</th>
              </tr>
              {results.map((row: TRows) => (
                <tr className='tableBody' key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.birthday_date}</td>
                  <td>{row.phone_number}</td>
                  <td>{row.address}</td>
                  <td>
                    <button onClick={() => getRow(row)}>Edit</button>
                  </td>
                  <td className='removeIcon' onClick={() => handleDelete(row)}>
                    <svg
                      className='removeIcon'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M17 6V5C17 3.89543 16.1046 3 15 3H9C7.89543 3 7 3.89543 7 5V6H4C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8H5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H17ZM15 5H9V6H15V5ZM17 8H7V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V8Z'
                        fill='currentColor'
                      />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className='countUsers'>
            {page}-{page + 9} of {count}
          </p>
        </div>
        <div className='buttonsContainer'>
          <button className='buttonsWithStyle' onClick={handPrevioustPage}>
            Previous
          </button>
          <button className='buttonsWithStyle' onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
