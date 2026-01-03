'use client'

import { addToCart } from '@/lib/actions';
import { useState } from 'react';

export default function AddToCartButton({ 
  productId 
}: { 
  productId: string 
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await addToCart(productId);
    setLoading(false);
    alert('Added to cart!');
  }

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}