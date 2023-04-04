import React, { useState, useEffect } from "react";
import { fetchProductDetail } from "../../utils/api";
import styles from "./ProductDetail.module.css";

const getFormattedCurrency = (amount) => {
  const currencyFormatter = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "GBP",
  });

  return currencyFormatter.format(amount);
};

const ProductDetail = ({ productId, onError }) => {
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!productId) {
      setProductInfo(null);

      return;
    }

    setIsLoading(true);
    fetchProductDetail(productId)
      .then((productInfo) => {
        onError(null);
        setIsLoading(false);
        setProductInfo(productInfo);
      })
      .catch((error) => onError(`Couldn't load product details "${error}"`));
  }, [onError, productId]);

  const renderProductInfo = () => {
    return isLoading ? (
      <div className={styles.loading}>Loading results...</div>
    ) : (
      <div className={styles.detailContainer}>
        <div className={styles.row}>
          <img
            src={productInfo.image}
            className={styles.productImage}
            alt={productInfo.title}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.rowBold}>{productInfo.title}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.rowLight}>{productInfo.description}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.rowBold}>
            {getFormattedCurrency(productInfo.price)}
          </div>
        </div>
      </div>
    );
  };

  return productInfo && renderProductInfo();
};

export const MemoizedProductDetail = React.memo(ProductDetail);
