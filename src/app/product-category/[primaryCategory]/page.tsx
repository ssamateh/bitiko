'use client'

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useParams } from 'next/navigation'

const ProductCategory = () => {
  const params = useParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/sub-categories/${params.primaryCategory}`)
      .then(res => res.json())
      .then(console.log)
      .finally(() => {
        setLoading(false)
      })
      .catch(console.error)
  }, [params.primaryCategory])

  return (
    <div className={styles.ProductCategory}>
      <p>Product Category Page for {params.primaryCategory} is comming soon</p>
    </div>
  );
}

export default ProductCategory