import React from 'react';
import ProductForm from "../ProductForm"
import { connect } from 'react-redux';
import {editProduct, fetchProduct} from "../../actions"
import Product from "../product-list/Product"

class ProductEdit extends React.Component {
  componentDidMount () {
    this.props.fetchProduct(this.props.match.params.id)
  }

  render () {
    if (!this.props.product) {
      return null
    }

    return (
      <div>
        <h3>Edit</h3>
        <div className="ui grid">
          <div className="eight wide column">
            <ProductForm onSubmit={this.onSubmit} initialValues={{price: this.props.product.price, title: this.props.product.title, photo: this.props.product.photo}}/>
          </div>
          <div className="four wide column">
            <Product product={this.props.product} showAdminTools={false} />
          </div>
        </div>

      </div>
    );
  }

  onSubmit = (formValues) => {
    this.props.editProduct(this.props.match.params.id, formValues)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    product: state.products[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { fetchProduct, editProduct })(ProductEdit)
