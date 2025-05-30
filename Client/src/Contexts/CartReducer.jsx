const initialState = [];

export const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem("a2zkart")) || initialValue;

const Cartreducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_CART':
      return [];
    case 'SET_CART':
      return action.payload ? action.payload : [];
    case 'Add':
      const existingProductIndex = state.findIndex((item) => item.id === action.item.id);
      if (existingProductIndex !== -1) {
        return state.map((item, index) =>
          index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        return [...state, { ...action.item, quantity: 1 }];
      }

    case 'Remove':
      return state.filter((item) => item.id !== action.item.id);

    case 'Increase':
      return state.map((item) =>
        item.id === action.item.id ? { ...item, quantity: item.quantity + 1 } : item,
      );

    case 'Decrease':
      return state
        .map((item) =>
          item.id === action.item.id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0);
    default:
      return state;
  }
};

export default Cartreducer;
