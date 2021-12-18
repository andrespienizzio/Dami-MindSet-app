import React from 'react';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import { Form, Field } from 'react-final-form';
import styles from './otherInfoForm.module.css';

const OtherInfoForm = () => {
  const onSubmit = (formValues) => {
    console.log(formValues);
  };
  return (
    <section className={styles.container}>
      <div className={styles.containerForm}>
        <h2 className={styles.title}>Other Information (optional)</h2>
        <Form
          onSubmit={onSubmit}
          render={(formProps) => (
            <form onSubmit={formProps.handleSubmit}>
              <Field
                component={Input}
                label="Nationality"
                name="nationality"
                placeholder="Enter your nationality"
                disabled={formProps.submitting}
              />
              <Field
                component={Input}
                label="ID Number"
                name="idNumber"
                placeholder="Enter your ID Number"
                disabled={formProps.submitting}
              />
              <Field
                component={Select}
                label="Marital Status"
                name="maritalSattus"
                options={['single', 'married', 'divorced', 'widowed']}
                disabled={formProps.submitting}
              />
              <Field
                component={Select}
                label="Do you hace a driver license?"
                name="driverLicense"
                options={['yes', 'no']}
                disabled={formProps.submitting}
              />
              <div className={styles.containerFooter}>
                <Button type={'back'} text={'BACK'} />
                <Button type={'next'} text={'NEXT'} />
              </div>
            </form>
          )}
        />
      </div>
    </section>
  );
};

export default OtherInfoForm;
