const initialState = [];

// Initializer: used in useReducer's third argument
export const initializer = (initialValue = initialState) => {
  try {
    const stored = localStorage.getItem('a2zkart');
    return stored ? JSON.parse(stored) : initialValue;
  } catch {
    return initialValue;
  }
};

const CartReducer = (state, action) => {
  let updatedCart;

  switch (action.type) {
    case 'CLEAR_CART':
      updatedCart = [];
      localStorage.removeItem('a2zkart');
      return updatedCart;

    case 'SET_CART':
      updatedCart = action.payload ? action.payload : [];
      break;

    case 'Add':
      const existingProductIndex = state.findIndex((item) => item.id === action.item.id);
      if (existingProductIndex !== -1) {
        updatedCart = state.map((item, index) =>
          index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        updatedCart = [...state, { ...action.item, quantity: 1 }];
      }
      break;

    case 'Remove':
      updatedCart = state.filter((item) => item.id !== action.item.id);
      break;

    case 'Increase':
      updatedCart = state.map((item) =>
        item.id === action.item.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
      break;

    case 'Decrease':
      updatedCart = state
        .map((item) =>
          item.id === action.item.id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0);
      break;

    default:
      // Return current state if action type is unrecognized
      return state;
  }

  // ✅ Sync updated cart to localStorage on every cart change
  localStorage.setItem('a2zkart', JSON.stringify(updatedCart));
  return updatedCart;
};

export default CartReducer;
