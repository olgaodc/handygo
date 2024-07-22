import clsx from 'clsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BookingFormValues } from '@/types/booking-form-values';
import { Form, Formik } from 'formik';
import useBooking from '@/hooks/use-booking';
import useAuth from '@/store/use-auth';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import bookingValidationSchema from '@/formik-validation/booking-validation-schema';
import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import CloseIcon from '@/assets/close-icon.svg';
import availableTimeSlots from '@/data/mocked-times';
import styles from './styles.module.scss';
import PrimaryButton from '../../primary-button/primary-button';

interface Props {
  closeModal: () => void;
}

const initialValues: BookingFormValues = {
  businessId: '',
  date: '',
  time: '',
  userEmail: '',
  userName: '',
  status: 'pending',
};

const BookingForm = ({ closeModal }: Props) => {
  const { id: businessId } = useParams<{ id: string }>();
  const { bookService, success } = useBooking();
  const { user } = useAuth();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (success) {
      setMessage('Successfully booked');

      setTimeout(() => {
        closeModal();
      }, 1000);
    }
  }, [success, closeModal]);

  const handleSubmit = async (values: BookingFormValues) => {
    if (user) {
      const bookingData = {
        businessId: businessId || '',
        date: values.date,
        time: values.time,
        userEmail: user.email,
        userName: user.name,
        status: 'pending',
      };

      await bookService(bookingData);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={bookingValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting, setFieldValue, values, errors, touched,
      }) => (
        <Form className={styles.form}>
          <button className={styles.closeButton} type='button' onClick={closeModal}>
            <ReactSVG src={CloseIcon} />
          </button>
          <h2 className={styles.formTitle}>Book a Service</h2>
          <p className={styles.formDescription}>Select Date and Time to book a service</p>
          <div className={styles.datePickerWrapper}>
            <h3 className={styles.title}>Select Date</h3>
            <DatePicker
              className={styles.datePicker}
              selected={values.date ? new Date(values.date) : null}
              onChange={(date) => setFieldValue('date', date ? format(date, 'dd-MMM-yyyy') : '')}
              inline
              minDate={new Date()}
            />
            {touched.date && errors.date && <div className={styles.error}>{errors.date}</div>}
          </div>
          <div className={styles.timeSlotsWrapper}>
            <h3 className={styles.title}>Select Time Slot</h3>
            <div className={styles.timeSlots}>
              {availableTimeSlots.map((time) => (
                <button
                  key={time}
                  type='button'
                  className={clsx(styles.time, values.time === time ? styles.selected : '')}
                  onClick={() => setFieldValue('time', time)}
                >
                  {time}
                </button>
              ))}
            </div>
            {touched.time && errors.time && <div className={styles.error}>{errors.time}</div>}
          </div>

          <PrimaryButton type='submit' disabled={isSubmitting}>Book Now</PrimaryButton>
          {message && <p className={styles.message}>{message}</p>}
        </Form>
      )}
    </Formik>
  );
};

export default BookingForm;
