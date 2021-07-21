import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../text-input/text-input';
import Dropdown from '../dropdown/dropdown';
import TextArea from '../text-area/text-area';

const ContactForm = () => {
  const validateTypeOfTiger = (value) => {
    let error;
    if (value === '') {
      error = 'Required';
    }
    return error;
  };
  return (
    <>
      <h1>Contact form</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
          colour: '',
          animal: '',
          tigerType: ''
        }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
          colour: Yup.string().oneOf(['Blue', 'Green', 'Red', 'Black', 'Brown'], 'Invalid Colour').required('Required'),
          animal: Yup.mixed().required('Required')
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log('values', values);
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <TextInput label="Email Address" name="email" type="email" placeholder="Your Email address" />
            <TextInput label="Password" name="password" type="password" placeholder="Your Password" />
            <Dropdown
              label="Colour"
              name="colour"
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125.304 125.304"><path d="M62.652 103.895L0 21.41h125.304" fill="%23ffffff"/></svg>')`
              }}
            >
              <option value="">Select colour</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Red">Red</option>
              <option value="Black">Black</option>
              <option value="Brown">Brown</option>
            </Dropdown>
            <Dropdown label="Animals (use Ctrl+ to select multiple)" name="animal" multiple={true}>
              <option value="Bear">Bear</option>
              <option value="Tiger">Tiger</option>
              <option value="Snake">Snake</option>
              <option value="Donkey">Donkey</option>
            </Dropdown>
            {props.values.animal.includes('Tiger') === true && (
              <TextArea label="Type of tiger" name="tigerType" id="tigerType" rows="4" validate={validateTypeOfTiger} />
            )}
            <div>
              <button type="submit">Submit</button>
            </div>
            {props.isValid && <div id="feedback">Your input: {JSON.stringify(props.values, null, 2)}</div>}
          </form>
        )}
      </Formik>
    </>
  );
};

export default ContactForm;
