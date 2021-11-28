import { useState, useEffect } from 'react';
import styles from './form.module.css';

function ClientsForm({ id, handleSubmit, handleShowModal }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    cuit: '',
    activity: ''
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/api/clients/${id}`)
        .then((response) => response.json())
        .then((response) => {
          setFormData(response);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newClient = {
      name: event.target[0].value,
      email: event.target[1].value,
      address: event.target[2].value,
      phoneNumber: event.target[3].value,
      cuit: event.target[4].value,
      activity: event.target[5].value
    };
    handleSubmit(newClient);
    handleShowModal();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.formField}>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className={styles.formField}>
        <label>Email</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className={styles.formField}>
        <label>Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </div>
      <div className={styles.formField}>
        <label>Phone Number</label>
        <input
          type="number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formField}>
        <label>CUIT</label>
        <input type="number" name="cuit" value={formData.cuit} onChange={handleChange} />
      </div>
      <div className={styles.formField}>
        <label>Activity Type</label>
        <input type="text" name="activity" value={formData.activity} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
export default ClientsForm;
