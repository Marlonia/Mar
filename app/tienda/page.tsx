'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: 'trajes' | 'accesorios' | 'entradas';
  price: number;
  image: string;
  description: string;
  inStock: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: 'marimonda-deluxe',
    name: 'Traje Marimonda Deluxe',
    category: 'trajes',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    description: 'Traje completo de Marimonda con máscara auténtica, incluye camisa, pantalones y accesorios.',
    inStock: true,
  },
  {
    id: 'marimonda-basico',
    name: 'Traje Marimonda Básico',
    category: 'trajes',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    description: 'Conjunto básico de Marimonda sin máscara. Perfecto para principiantes.',
    inStock: true,
  },
  {
    id: 'mascara-tradicional',
    name: 'Máscara Marimonda Tradicional',
    category: 'accesorios',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop',
    description: 'Máscara auténtica de Marimonda hecha a mano por artesanos colombianos.',
    inStock: true,
  },
  {
    id: 'cinta-cintura',
    name: 'Cinta de Cintura Decorativa',
    category: 'accesorios',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    description: 'Cinta decorativa colorida para complementar tu vestuario de danza.',
    inStock: true,
  },
  {
    id: 'pulseras-set',
    name: 'Set de Pulseras Carnaval',
    category: 'accesorios',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    description: 'Set de 5 pulseras coloridas con símbolos del Carnaval.',
    inStock: true,
  },
  {
    id: 'entrada-evento-2024',
    name: 'Entrada - Evento Especial 2024',
    category: 'entradas',
    price: 75.0,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop',
    description: 'Entrada para evento especial de Carnaval 2024 con acceso completo.',
    inStock: true,
  },
  {
    id: 'entrada-familia',
    name: 'Pack Familiar (4 Entradas)',
    category: 'entradas',
    price: 250.0,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop',
    description: '4 entradas a precio reducido para familias.',
    inStock: true,
  },
  {
    id: 'pies-zapatos-danza',
    name: 'Zapatos de Danza Tradicionales',
    category: 'accesorios',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop',
    description: 'Zapatos cómodos diseñados para la danza del Carnaval.',
    inStock: false,
  },
];

export default function TiendaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [cartItems, setCartItems] = useState<Map<string, number>>(new Map());
  const [showCart, setShowCart] = useState(false);

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'trajes', label: 'Trajes' },
    { id: 'accesorios', label: 'Accesorios' },
    { id: 'entradas', label: 'Entradas' },
  ];

  const filteredProducts =
    selectedCategory === 'todos'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const addToCart = (productId: string) => {
    const newCart = new Map(cartItems);
    newCart.set(productId, (newCart.get(productId) || 0) + 1);
    setCartItems(newCart);
  };

  const removeFromCart = (productId: string) => {
    const newCart = new Map(cartItems);
    const current = newCart.get(productId) || 0;
    if (current > 1) {
      newCart.set(productId, current - 1);
    } else {
      newCart.delete(productId);
    }
    setCartItems(newCart);
  };

  const cartTotal = Array.from(cartItems.entries()).reduce((total, [id, qty]) => {
    const product = PRODUCTS.find((p) => p.id === id);
    return total + (product?.price || 0) * qty;
  }, 0);

  const cartCount = Array.from(cartItems.values()).reduce((a, b) => a + b, 0);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-carnival-red to-carnival-gold text-white py-16">
        <div className="container-max flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-display font-bold mb-4">Tienda</h1>
            <p className="text-xl text-white/90">
              Compra trajes, accesorios y entradas para eventos
            </p>
          </div>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative p-4 bg-white/20 rounded-lg hover:bg-white/30 transition"
            title="Ver carrito"
          >
            <span className="text-3xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-carnival-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="bg-carnival-lightBg py-8">
        <div className="container-max">
          <h3 className="font-accent font-bold mb-4">Categorías:</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-accent font-bold transition ${
                  selectedCategory === cat.id
                    ? 'bg-carnival-red text-white'
                    : 'bg-white text-carnival-darkBg hover:bg-carnival-red hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container-max">
          <p className="text-gray-600 mb-8">
            Mostrando {filteredProducts.length} de {PRODUCTS.length} productos
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Sin Stock</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-carnival-darkBg mb-2">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-3xl font-display font-bold text-carnival-red">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={!product.inStock}
                    className={`w-full py-2 rounded-lg font-accent font-bold transition ${
                      product.inStock
                        ? 'btn-secondary'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? 'Agregar al Carrito' : 'Sin Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold">Carrito</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-2xl hover:text-carnival-red transition"
              >
                ✕
              </button>
            </div>

            {cartItems.size === 0 ? (
              <p className="text-gray-600 text-center py-8">Tu carrito está vacío</p>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {Array.from(cartItems.entries()).map(([productId, quantity]) => {
                    const product = PRODUCTS.find((p) => p.id === productId);
                    if (!product) return null;
                    return (
                      <div key={productId} className="border-b pb-4">
                        <h4 className="font-display font-bold mb-2">{product.name}</h4>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <button
                              onClick={() => removeFromCart(productId)}
                              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              −
                            </button>
                            <span className="px-4 py-1 bg-carnival-lightBg rounded">
                              {quantity}
                            </span>
                            <button
                              onClick={() => addToCart(productId)}
                              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-bold">
                            ${(product.price * quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Total */}
                <div className="border-t-2 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-accent font-bold">Total:</span>
                    <span className="text-3xl font-display font-bold text-carnival-red">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full btn-primary">Ir al Checkout</button>
                </div>

                {/* Continue Shopping */}
                <button
                  onClick={() => setShowCart(false)}
                  className="w-full btn-outline"
                >
                  Continuar Comprando
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Why Shop Section */}
      <section className="bg-carnival-lightBg py-16">
        <div className="container-max">
          <h2 className="text-3xl font-display font-bold text-carnival-darkBg mb-12 text-center">
            ¿Por Qué Comprar con Nosotros?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '✅',
                title: 'Productos Auténticos',
                desc: 'Todos nuestros trajes y accesorios son auténticos y de calidad premium.',
              },
              {
                icon: '📦',
                title: 'Envío Rápido',
                desc: 'Envío garantizado en 3-5 días hábiles a cualquier lugar.',
              },
              {
                icon: '💚',
                title: 'Apoya la Comunidad',
                desc: 'Parte de tus compras apoyan a artistas y artesanos locales.',
              },
            ].map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="font-display font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
