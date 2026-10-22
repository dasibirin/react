import { useState } from 'react';
import './App.css';

function FavoriteButton( props ) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button onClick={() => setIsFavorite(!isFavorite)}>
      {isFavorite
        ? '♥ במועדפים'
        : `♡ הוספת ${props.productName} למועדפים`}
    </button>
  );
}
function App2() {
  const [cart, setCart] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductFeatures, setNewProductFeatures] = useState('');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'סט כוסות',
      price: 25,
      description: 'סט של שישה כוסות זכוכית עמידות.',
      features: ['זכוכית עמידה', 'מתאימות למדיח', 'מעוצבות'],
    },
    {
      id: 2,
      name: 'סט צלחות',
      price: 55,
      description: 'סט של שמונה צלחות זכוכית עמידות.',
      features: ['זכוכית עמידה', 'מתאימות למדיח', 'מעוצבות'],
    },
    {
      id: 3,
      name: 'סיר איכותי',
      price: 155,
      description: 'סיר איכותי עם מכסה זכוכית.',
      features: ['גודל 2 ליטר', 'לא נשרף', 'מכסה זכוכית'],
    },
  ]);

  function addProduct() {
    const name = newProductName.trim();
    const price = Number(newProductPrice);
    const description = newProductDescription.trim();
    const features = newProductFeatures
      .split(',')
      .map((feature) => feature.trim())
      .filter(Boolean);

    if (!name || !description || !features.length || !Number.isFinite(price) || price <= 0) {
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price,
      description,
      features,
    };

    setProducts((previousProducts) => [...previousProducts, newProduct]);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductDescription('');
    setNewProductFeatures('');
    setShowAddProductForm(false);
  }

  function addToCart(product, amount = 1) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + amount }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: amount }];
    });
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="store">
      <h1>המוצרים שלנו</h1>
      <button
        className="add-product-button"
        type="button"
        onClick={() => setShowAddProductForm((isVisible) => !isVisible)}
      >
        {showAddProductForm ? 'סגירת הטופס' : 'הוספת מוצר'}
      </button>

      {showAddProductForm && <form
        className="add-product-form"
        onSubmit={(event) => {
          event.preventDefault();
          addProduct();
        }}
      >
        <label>
          שם המוצר
          <input
            value={newProductName}
            onChange={(event) => setNewProductName(event.target.value)}
            placeholder="למשל: קערת הגשה"
            required
          />
        </label>
        <label>
          מחיר (₪)
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={newProductPrice}
            onChange={(event) => setNewProductPrice(event.target.value)}
            placeholder="למשל: 35"
            required
          />
        </label>
        <label>
          תיאור
          <input
            value={newProductDescription}
            onChange={(event) => setNewProductDescription(event.target.value)}
            placeholder="תיאור קצר למוצר"
            required
          />
        </label>
        <label>
          מאפיינים (להפריד בפסיקים)
          <input
            value={newProductFeatures}
            onChange={(event) => setNewProductFeatures(event.target.value)}
            placeholder="עמיד, מתאים למדיח, קל לניקוי"
            required
          />
        </label>
        <button className="add-product-button" type="submit">
          הוספת מוצר
        </button>
      </form>}

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

      <div className="cart-panel">
        <h2>העגלה שלך</h2>
        {cart.length === 0 ? (
          <p>העגלה ריקה</p>
        ) : (
          cart.map((item) => (
            <p key={item.id}>
              {item.name} - {item.quantity} × {item.price} ₪
            </p>
          ))
        )}
        <h3>סה״כ: {total} ₪</h3>
      </div>
    </div>
  );
}

function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <FavoriteButton productName={product.name} />
      <p>מחיר: {product.price} ₪</p>

      <ProductDescription
        description={product.description}
        features={product.features}
      />

      <button
        type="button"
        onClick={() => setQuantity((prev) => Math.max(0, prev - 1))}
        disabled={quantity === 0}
      >
        -
      </button>
      <span> {quantity} </span>
      <button type="button" onClick={() => setQuantity((prev) => prev + 1)}>
        +
      </button>

      <p>סה״כ למוצר: {quantity * product.price} ₪</p>

      <button
        type="button"
        onClick={() => {
          if (quantity > 0) {
            addToCart(product, quantity);
            setQuantity(0);
          }
        }}
        disabled={quantity === 0}
      >
        הוסף לעגלה
      </button>
    </div>
  );
}

function ProductDescription({ description, features }) {
  const [expanded, setExpanded] = useState(false);
  const previewLength = 30;
  const isLongDescription = description.length > previewLength;
  const hasMoreContent = isLongDescription || features.length > 0;
  const visibleDescription = expanded || !isLongDescription
    ? description
    : `${description.slice(0, previewLength)}...`;

  return (
    <div>
      <p>{visibleDescription}</p>
      {expanded && (
        <ul>
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      )}
      {hasMoreContent && (
        <button type="button" onClick={() => setExpanded((prev) => !prev)}>
          {expanded ? 'הצג פחות' : 'קרא עוד'}
        </button>
      )}
    </div>
  );
}

function ContactForm() {
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const maxLength = 100;

  function handleSubmit(e) {
    e.preventDefault();
    if (message.trim() !== '') {
      setIsSubmitted(true);
    }
  }

  if (isSubmitted) {
    return <p>ההודעה נשלחה, תודה!</p>;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={maxLength}
        placeholder="הקלדי כאן את הודעתך..."
      />
      <p>נשארו {maxLength - message.length} תווים</p>
      <button type="submit" disabled={message.trim() === ''}>
        שליחה
      </button>
    </form>
  );
}

function App() {
  const [isdark, setIdark] = useState(false);

  return (
    <div className={isdark ? 'dark' : 'light'}>
      <button className="theme-toggle" type="button" onClick={() => setIdark((current) => !current)}>
        {isdark ? '☀️' : '🌙'}
      </button>
      <App2 />
      <ContactForm />
    </div>
  );
}

export default App;
