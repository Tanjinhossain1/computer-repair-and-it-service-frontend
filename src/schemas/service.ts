import * as yup from 'yup';

const serviceSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  image: yup.string().required('Image is required'),
  price: yup.string().required('Price is required'),
  status: yup.string().required('Status is required'),
  category: yup.string().required('Category is required'),
  rating: yup.string().nullable(), // Allows null or a string for the rating
});
export const serviceEditSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
//   image: yup.string().required('Image is required'),
  price: yup.string().required('Price is required'),
  status: yup.string().required('Status is required'),
  category: yup.string().required('Category is required'),
  rating: yup.string().nullable(), // Allows null or a string for the rating
});

export default serviceSchema;
