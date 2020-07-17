import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createProduct } from "../actions"

class ProductForm extends React.Component {
  render () {
    return (
      <div>
        <form className="ui form error" onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          <Field name="title" component={this.renderInput} label="title" placeholder="title"/>
          <Field name="price" component={this.renderInput} label="price" placeholder="UAH"/>
          <Field name="photo" component={this.renderPhotoInput} label="photo"/>
          <button className="ui button violet" type="submit">Submit</button>
        </form>
      </div>
    )
  }

  renderInput = ({input, label, placeholder, meta}) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} placeholder={placeholder} autoComplete="off"/>
        {this.renderError(meta)}
      </div>
    )
  }

  renderPhotoInput = ({input, label, meta}) => {
    return (
      <div className="field">
        <div>
          <label htmlFor="file" className="ui icon button primary">
            <i className="file icon" />
            Upload Photo</label>
          <input type="file" id="file" onChange={input.onChange} className="none" />
        </div>
      </div>
    )
  }

  /**
   *
   * @param touched
   * @param error
   * @returns {*}
   */
  renderError ({touched, error}) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

}

/**
 *
 * @param formValues
 */
const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must fill title'
  }

  if (!formValues.price) {
    errors.price = 'You must fill price'
  }

  return errors
}

export default reduxForm({
  form: 'productForm',
  validate: validate
})(connect(null, {createProduct})(ProductForm))


