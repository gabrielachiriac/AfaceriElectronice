import { useEffect, useState } from "react";
import { getProducts } from "../routes/products";

const Products = (props) => {
  const { filters, sorting } = props;
  const [products, setProducts] = useState([]);

  const handleGetProducts = async () => {
    try {
      const response = await getProducts(filters, sorting);
      setProducts(response.products);
    } catch (error) {
      console.error(error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "star filled" : "star"}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  useEffect(() => {
    handleGetProducts();
  }, [filters, sorting]);

  return (
    <div className="products-container">
      {products?.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.thumbnail} alt={product.title} />
          <h2 className="product-title">{product.title}</h2>
          <div className="rating">
            {renderStars(Math.round(product.rating))}
            <span style={{ paddingLeft: "4px", paddingRight: "4px" }}>
              {product.rating}
            </span>
            <span>({product.reviews.length})</span>
          </div>
          <div className="price-cart">
            <p className="price">${product.price.toFixed(2)}</p>
            <div>
              <button className="add-to-cart">
                <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
