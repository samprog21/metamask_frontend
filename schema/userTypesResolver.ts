import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  dob: yup.string().required('Date of Birth is required'),
  profilePicture: yup
    .mixed<FileList>()
    .required('Profile Picture is required')
    .test('fileSize', 'File too large', (value) => {
      return value && value[0].size <= FILE_SIZE;
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      return value && SUPPORTED_FORMATS.includes(value[0].type);
    })
});

const updateSchema = yup.object().shape({
  firstName: yup.string().optional(),
  id: yup.string().optional(),
  lastName: yup.string().optional(),
  email: yup.string().email('Invalid email format').optional(),
  password: yup.string().min(8, 'Password must be at least 8 characters').optional(),
  dob: yup.string().optional(),
  profilePicture: yup
    .mixed<FileList>()
    .optional()
    .test('fileSize', 'File too large', (value) => {
      if (value && value.length > 0) {
        return value[0].size <= FILE_SIZE;
      }
      return true;
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      if (value && value.length > 0) {
        return SUPPORTED_FORMATS.includes(value[0].type);
      }
      return true;
    })
});
const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

const userTypesResolver = yupResolver(schema);
const userLoginResolver = yupResolver(loginSchema);
const userUpdateResolver = yupResolver(updateSchema);

export {userTypesResolver,userLoginResolver,userUpdateResolver}
