'use client'

import Image from "next/image";

import Theme from "@/app/Providers/Theme"
import { ProductCardData } from "@/interface";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "./page.module.scss";
import { useWindowSize } from "usehooks-ts";
import { ProductTitle } from "@/components/ProductTitle/ProductTitle";

const Product = () => {

  const params = useParams()
  const [product, setProduct] = useState<ProductCardData | undefined>()

  useEffect(() => {
    fetch(`/api/product/${params.id}`)
      .then(res => res.json())
      .then(setProduct)
  }, [params.id])

  const { width } = useWindowSize()
  const imageSize = Math.floor(Math.max(250, width / 2))


  return (
    <Theme>
      <div className={styles.container}>
        <div className={styles.top}>
          <Image src={product?.images?.[0] ?? ""} width={imageSize} height={imageSize} alt={product?.name ?? ""} />
          <div>
            <ProductTitle title={product?.name!} />
            <div>{product?.price}</div>
          </div>
        </div>
        <div>{product?.details?.toString() ?? ''}</div>
      </div>
    </Theme>
  )
}

export default Product