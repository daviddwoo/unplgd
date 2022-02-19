//COMBINE FORMS --> NEED TO ADD SELECT OPTIONS DROPDOWN FOR ADD PRODUCT & CENTER ON PAGE, KEEP EDIT PRODUCT AS IS.
//MAKE BOTH FORMS DROPDOWN FOR CATEGORY?

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProd, createProd } from '../store';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { Formik, Form, useField, FieldArray } from 'formik';
import { TextField, Button, Grid } from '@material-ui/core';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import * as yup from 'yup';

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      fullWidth={true}
      {...field}
      helperText={errorText}
      error={!!errorText}
      className="textfield"
      style={{ width: 320 }}
      id="outlined-basic"
      label={label}
      variant="outlined"
    />
  );
};

// const MySelect = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   const errorText = meta.error && meta.touched ? meta.error : '';
//   return (
//     <TextField
//       fullWidth={true}
//       {...field}
//       helperText={errorText}
//       error={!!errorText}
//       className="textfield"
//       style={{ width: 320 }}
//       id="outlined-basic"
//       label={label}
//       variant="outlined"
//     />
//   );
// };

const validationSchema = yup.object({
  category: yup.string().required('category is required'),
  brand: yup.string().required('brand is required'),
  model: yup.string().required('model is required'),
  price: yup.string().required('price is required'),
  description: yup.string().required('description is required'),
  quantity: yup.number().required().positive().integer(),
  img: yup.string(),
});

const EditProduct = () => {
  const { id } = useParams();
  const routeMatch = useRouteMatch();

  const products = useSelector((state) => state.products);

  const product = products.find((product) => product.id === id) || {};

  const allCategories = [
    ...new Set(
      products.map((product) => product.category).filter((product) => !!product)
    ),
  ];

  const history = useHistory();
  const dispatch = useDispatch();

  const notify = () =>
    toast.success(productExists ? 'product updated' : 'product added');

  const productExists = routeMatch.params.id;

  // console.log('CATEGORIES', allCategories);

  return (
    <div className="sp">
      {injectStyle()}
      <div className="sp-left">
        <div>
          <img className="sp-img" src={product.img} />
        </div>
      </div>
      <div className="sp-right">
        <div className="sp-right-wrap">
          <div className="sp-desc">
            <div className="formik">
              <Formik
                initialValues={{
                  id: productExists ? product.id : 1,
                  category: productExists ? product.category : allCategories,
                  brand: productExists ? product.brand : '',
                  model: productExists ? product.model : '',
                  price: productExists ? product.price : '',
                  description: productExists ? product.description : '',
                  quantity: productExists ? product.quantity : 1,
                  img: productExists
                    ? product.img ||
                      'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'
                    : '',
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting }) => {
                  setSubmitting(true); // before async call
                  productExists
                    ? dispatch(updateProd(data))
                    : dispatch(createProd(data));
                  setSubmitting(false); //after async call
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div>
                      <h4>
                        {productExists ? 'Edit Product Info' : 'Add Product'}
                      </h4>
                    </div>
                    <Grid container direction={'column'} spacing={3}>
                      <Grid item>
                        <MyTextField label="Brand" name="brand" type="input" />
                      </Grid>
                      <Grid item>
                        <MyTextField label="Model" name="model" type="input" />
                      </Grid>
                      <Grid item>
                        <MyTextField label="Price" name="price" type="input" />
                      </Grid>
                      <Grid item>
                        <MyTextField
                          label="Description"
                          name="description"
                          type="input"
                        />
                      </Grid>
                      <Grid item>
                        <MyTextField
                          label="Quantity"
                          name="quantity"
                          type="input"
                        />
                      </Grid>
                      <Grid item>
                        <MyTextField
                          label="Photo URL"
                          name="img"
                          type="input"
                        />
                      </Grid>
                      <Grid item>
                        <FieldArray name="Category"></FieldArray>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={notify}
                          disabled={isSubmitting}
                          type="submit"
                          color="primary"
                        >
                          SUBMIT
                        </Button>
                        <Button
                          type="button"
                          onClick={() => history.push('/admin/inventory')}
                          color="primary"
                        >
                          CANCEL
                        </Button>
                        <ToastContainer
                          position="top-center"
                          autoClose={1500}
                          hideProgressBar
                          newestOnTop={true}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          transition={Slide}
                        />
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
