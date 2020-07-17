import {CREATE_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, FETCH_PRODUCT, FETCH_PRODUCTS, SIGN_IN, SIGN_OUT} from "../types"

export const createProduct = (formValues) => async dispatch => {
  let formData = new FormData();

  if (formValues.photo) {
    formData.append("photo", formValues.photo[0]);
  }
  formData.append("title", formValues.title);
  formData.append("price", formValues.price);
  const postReq = await fetch('http://localhost:4000/products', {
    method : 'POST',
    headers : {
      // 'Accept' : 'application/json',
      // 'Content-Type' : 'multipart/form-data'
    },
    body : formData
  });
  const data = await postReq.json();

  dispatch({
    type: CREATE_PRODUCT,
    payload: data
  })

}

export const deleteProduct = (product) => async dispatch => {
  await fetch(`http://localhost:4000/products/${product.id}`, {
    method : 'DELETE',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    },
  });

  dispatch({
    type: DELETE_PRODUCT,
    payload: product
  })

}

export const editProduct = (id, formValues) => async dispatch => {
  const formData = new FormData();
  if (formValues.photo && formValues.photo instanceof FileList) {
    formData.append("photo", formValues.photo[0]);
  }
  formData.append("title", formValues.title);
  formData.append("price", formValues.price);

  const postReq = await fetch(`http://localhost:4000/products/${id}`, {
    method : 'PATCH',
    headers : {
      // 'Accept' : 'application/json',
      // 'Content-Type' : 'application/json'
    },

    body : formData
  });
  const data = await postReq.json();

  dispatch({
    type: EDIT_PRODUCT,
    payload: data
  })

}

export const fetchProducts = () => async dispatch => {
  const postReq = await fetch('http://localhost:4000/products', {
    method : 'GET',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    }
  });

  const data = await postReq.json();

  dispatch({
    type: FETCH_PRODUCTS,
    payload: data
  })

}

export const fetchProduct = (id) => async dispatch => {
  const postReq = await fetch(`http://localhost:4000/products/${id}`, {
    method : 'GET',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    }
  });
  const data = await postReq.json();

  dispatch({
    type: FETCH_PRODUCT,
    payload: data
  })

}


export const signIn = (userId) => {
  return {
    type : SIGN_IN,
    payload : userId
  }
}

export const signOut = () => {
  return {
    type : SIGN_OUT
  }
}
