import * as yup from 'yup';

const registerValidationSchema = yup.object().shape({
    password: yup
    .string()
    .required('Password is required')
    .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Must be one Special, number, alphabet charactes (@, 0, a)'
      )
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must not exceed 20 characters'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  middleName: yup.string().notRequired(), // Optional field
  dateOfBirth: yup.string().required('Date of Birth is required'),
  gender: yup.string().notRequired(), // Optional field
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format')
    .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}[^.]+[A-Za-z]+$/,
        'Invalid email format'
      ),

  contactNo: yup.string().required('Contact Number is required'),
});

export default registerValidationSchema;
