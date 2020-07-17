import React from 'react';
import {Link} from "react-router-dom"

class Product extends React.Component {

  render () {
    if (!this.props.product) {
      return null
    }

    return (
      <div className="ui card product" key={this.props.product.id}>
        {this.renderAdminTools()}

        <div className="content">
          <div className="image" >
            <img srcSet={'http://localhost:4000' + this.props.product.photo} alt={this.props.product.id}/>
          </div>
          <div className="product-info">
            <div className="title">{this.props.product.title}</div>
            <div className="price">UAH {this.props.product.price}</div>
            <a href="#" className="buy-button">BUY NOW</a>
          </div>
        </div>
      </div>
    )
  }

  renderAdminTools () {
    if (!this.props.showAdminTools) {
      return null
    }

    return (
      <div className="admin-tools">
        <i className="close icon" onClick={() => this.props.deleteProduct(this.props.product)}/>
        <Link to={`/products/edit/${this.props.product.id}`}>
          <i className="edit icon"/>
        </Link>
      </div>
    )
  }
}

export default Product
