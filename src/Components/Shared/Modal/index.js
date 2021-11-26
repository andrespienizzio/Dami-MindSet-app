import React from 'react';
import styles from './modal.module.css';
import Button from '../Button';

function Modal({ handleShowModal, component }) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <Button type="close" onClick={handleShowModal} />
        </div>
        <div className={styles.body}>{component}</div>
      </div>
    </div>
  );
}

export default Modal;
