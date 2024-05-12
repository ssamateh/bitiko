'use client'

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from 'next/navigation'
import { ProductCardData } from '@/interface'
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from './page.module.scss'
import Theme from "@/app/Providers/Theme";
import { useWindowSize } from "usehooks-ts";

const ProductCategory = () => {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<ProductCardData[]>([])

  useEffect(() => {
    setLoading(true)
    fetch(`/api/products/${params.primaryCategory}/${params.secondaryCategory}`)
      .then(res => res.json())
      .then(setProducts)
      .finally(() => {
        setLoading(false)
      })
  }, [params.primaryCategory, params.secondaryCategory])


  const cardDimensions = { min: 250, max: 450, ideal: 300 }
  const availableWidth = Math.min(1200, useWindowSize().width)
  const cardsPerColumn = Math.floor(Math.min(products.length, availableWidth / cardDimensions.ideal))
  const cardSize = Math.min(cardDimensions.max, Math.max(cardDimensions.min, Math.floor(availableWidth / cardsPerColumn)))

  const productRows = useMemo(() => {
    const rows: ProductCardData[][] = []
    const flattenedEntries = [...products]
    while (flattenedEntries.length) {
      rows.push(flattenedEntries.splice(0, cardsPerColumn))
    }
    return rows
  }, [cardsPerColumn, products])

  return (
    <Theme>
      <div className={styles.container}>
        <div>
          {/* Banner */}
        </div>
        <div>
          {/* Filter */}
        </div>
        {
          productRows.map((row, index) => (
            <div key={index} className={styles.row}>
              {
                row.map(p => (
                  <div key={p.id} style={{ width: cardSize }}>
                    <ProductCard {...p} cardSize={cardSize} />
                  </div>
                ))

              }
            </div>
          ))
        }
      </div>

    </Theme>

  );
}

export default ProductCategory