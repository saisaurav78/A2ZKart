const Cartreducer = (state, action) => {
    switch (action.type) {
        case 'Add':
            const existingProduct = state.findIndex(item => item.id === action.item.id)
             if (existingProduct !== -1) {
               const updatedCart = [...state];
               updatedCart[existingProduct].quantity += 1;
               return updatedCart;
             } else {
               return [...state, { ...action.item, quantity: 1 }];
             }
        case 'Remove':
        case 'Increase':
        case 'Decrease':
        default:
            return state;

    }
}
export default Cartreducer;