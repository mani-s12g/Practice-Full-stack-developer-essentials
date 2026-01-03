// # Product detail (Dynamic Route)

import { getProductById, getProducts } from '@/lib/data';
import  {notFound} from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
    params: {
        id: string
    }
}

export function generateMetadata({params}: Props): Promise<Metadata> {
    const product = getProductById(params.id);
    return {
        title: product ? product.name : 'Product Not Found'
    };
}

export async function generateStaticParams() {
  const products = getProducts();
  return products.map(p => ({ id: p.id }));
}

export default function ProductPage({ params }: Props) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <p>Product ID: {product.id}</p>
      <br />
      <a href="/">Back to Products</a>
    </div>
  );
}