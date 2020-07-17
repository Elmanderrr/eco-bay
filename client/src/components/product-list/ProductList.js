import React from 'react';
import { connect } from 'react-redux';
import './ProductList.scss';
import { fetchProducts, deleteProduct } from "../../actions"
import {Link} from "react-router-dom"
import Product from "./Product"

class ProductList extends React.Component {

  componentDidMount () {
    this.props.fetchProducts();
  }

  render () {
    return (
      <div>
        {this.renderAddButton()}
        <div className="product-list">
          {this.renderProducts()}
        </div>
      </div>
    );
  }

  renderProducts() {
    if (!this.props.products.length) {
      return null
    }
    return this.props.products.map((product, i) => {
      return (
        <Product className="product" key={product.id} product={product} deleteProduct={this.deleteProduct} showAdminTools={this.props.auth.isSignedIn}/>
      )
    })
  }

  /**
   *
   * @param product
   */
  deleteProduct = (product) => {
    this.props.deleteProduct(product)
  }

  renderAddButton () {
    if (this.props.auth.isSignedIn) {
      return (
        <div className="add-button-holder">
          <Link to={'/products/new'} >
            <i className="icon plus square outline add-product"/>
          </Link>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    products: Object.values(state.products),
    auth: state.auth
  }
}

export default connect(mapStateToProps, { fetchProducts, deleteProduct })(ProductList)
