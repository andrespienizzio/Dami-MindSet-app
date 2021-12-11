import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPositions, deletePositions } from '../../redux/Positions/thunks';
import { setShowModal, setShowMessage, setModalType } from '../../redux/Positions/actions';
import styles from './positions.module.css';
import Button from '../../Components/Shared/Button';
import Modal from '../Shared/Modal';
import Message from '../Shared/Message';
import Spinner from '../Shared/Spinner';

function Positions() {
  const showModal = useSelector((state) => state.positions.showModal);
  const modalType = useSelector((state) => state.positions.modalType);
  const [idActive, setIdActive] = useState('');
  const showMessage = useSelector((state) => state.positions.showMessage);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');
  const positions = useSelector((state) => state.positions.list);
  const isLoading = useSelector((state) => state.positions.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

  /* const cleanMessage = () => {
    setShowMessage(false);
    setMessage('');
  }; */

  const handleClickDelete = (id) => {
    /* cleanMessage(); */
    dispatch(setShowModal(true));
    setIdActive(id);
    dispatch(setModalType('delete'));
  };

  const handleDelete = (id) => {
    dispatch(deletePositions(id)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getPositions());
    });
  };

  const handleClickUpdate = (id) => {
    /*cleanMessage();*/
    setShowModal(true);
    setIdActive(id);
    setModalType('positions');
  };

  const handleUpdatePosition = (position) => {
    fetch(`${process.env.REACT_APP_API}/positions/${idActive}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(position)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then(() => {
        setShowMessage(true);
        setMessageType('success');
        setMessage('Position updated');
        getPositions();
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
        setMessage('Error updating position');
      });
  };

  const handleClickAdd = () => {
    /*cleanMessage();*/
    setShowModal(true);
    setModalType('positions');
    setIdActive('');
  };

  const handleAddPosition = (position) => {
    fetch(`${process.env.REACT_APP_API}/positions`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(position)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        if (response.errors || response.code) {
          setShowMessage(true);
          setMessageType('error');
          setMessage('Error with parameters');
          return;
        }
        setShowMessage(true);
        setMessageType('success');
        setMessage('Position added');
        getPositions();
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
        setMessage('Error adding position');
      });
  };

  const handleShowModal = () => {
    setShowModal(false);
  };

  const handleShowMessage = () => {
    setShowMessage(false);
  };

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

  return (
    <section className={styles.container}>
      <div className={styles.list}>
        <div>
          <h2>Positions</h2>
          {showMessage && (
            <Message type={messageType} message={message} showMessage={handleShowMessage} />
          )}
          <Button type="addNew" text={'POSITION'} onClick={handleClickAdd} />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Client</th>
              <th>Profile</th>
              <th>Full Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Address</th>
              <th>City</th>
              <th>ZIP Code</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => {
              return (
                <tr key={position._id}>
                  <td>{position.idClient ? position.idClient.name : position.idClient._id}</td>
                  <td>{position.idProfile.length ? position.idProfile[0].name : ''}</td>
                  <td>{position.name}</td>
                  <td>{position.description}</td>
                  <td>{position.status}</td>
                  <td>{position.address}</td>
                  <td>{position.city}</td>
                  <td>{position.postalCode}</td>
                  <td>
                    <Button type="delete" onClick={() => handleClickDelete(position._id)} />
                    <Button type="update" onClick={() => handleClickUpdate(position._id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showModal && (
        <Modal
          handleShowModal={handleShowModal}
          modalType={modalType}
          handleSubmit={
            modalType === 'delete'
              ? () => handleDelete(idActive)
              : modalType === 'positions' && !idActive
              ? handleAddPosition
              : handleUpdatePosition
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Positions;
