import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
    password: yup
    .string()
    .required('Password is required') 
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must not exceed 20 characters'),
    
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format')
    .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}[^.]+[A-Za-z]+$/,
        'Invalid email format'
      ),
});

export default loginValidationSchema;
