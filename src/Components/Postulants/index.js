import { useState, useEffect } from 'react';
import styles from './postulants.module.css';
import Button from '../../Components/Shared/Button';
import Modal from '../Shared/Modal';
/* import Message from '../Shared/Message'; */

function Postulants() {
  const [postulants, setPostulants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [idActive, setIdActive] = useState('');

  useEffect(() => {
    // Cambiar por variable de entorno
    fetch(`https://basd21-dami-mindset-api-dev.herokuapp.com/api/candidates`)
      .then((response) => response.json())
      .then((response) => {
        setPostulants(response);
      });
  }, []);

  const handleClickDelete = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('delete');
  };

  const handleDelete = (id) => {
    fetch(`https://basd21-dami-mindset-api-dev.herokuapp.com/api/candidates/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then(() => {
        setPostulants(postulants.filter((postulant) => postulant._id !== id));
      });
  };

  const handleUpdatePostulant = (postulant) => {
    console.log(postulant);
  };

  const handleClickUpdate = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('postulants');
  };

  const handleClickAdd = () => {
    setShowModal(true);
    setModalType('postulants');
  };

  const handleAddPostulant = (postulant) => {
    console.log(postulant);
  };

  const handleShowModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <h2>Postulants</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Country</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {postulants.map((postulant) => {
            return (
              <tr key={postulant._id}>
                <td>{postulant.name}</td>
                <td>{postulant.email}</td>
                <td>{postulant.phoneNumber}</td>
                <td>{postulant.country}</td>
                <td>{postulant.status}</td>
                <td>
                  <Button type="delete" onClick={() => handleClickDelete(postulant._id)} />
                  <Button type="update" onClick={() => handleClickUpdate(postulant._id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button type="add" onClick={handleClickAdd} />
      {showModal && (
        <Modal
          handleShowModal={handleShowModal}
          modalType={modalType}
          handleSubmit={
            modalType === 'delete'
              ? () => handleDelete(idActive)
              : modalType === 'postulants'
              ? handleUpdatePostulant
              : handleAddPostulant
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Postulants;
