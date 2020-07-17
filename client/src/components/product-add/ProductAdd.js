import React from 'react';
import ProductForm from "../ProductForm"
import { connect } from 'react-redux';
import {createProduct} from "../../actions"

class ProductAdd extends React.Component {
  render () {
    return (
      <div>
        <h3>Add</h3>
        <ProductForm onSubmit={this.onSubmit}/>
      </div>
    );
  }

  onSubmit = (formValues) => {
    this.props.createProduct(formValues)
  }
}

export default connect(null, { createProduct })(ProductAdd)
