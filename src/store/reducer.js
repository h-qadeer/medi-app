import productData from '../mock.json';
const initState = {
  items: productData.products,
  addedItems: [],
  total: 0,
  isUserLoggedIn: false,
};
const cartReducer = (state = initState, action) => {
  if (action.type === 'ADD_TO_CART') {
    let addedItem = state.items.find(item => item.id === action.id);
    let existed_item = state.addedItems.find(item => action.id === item.id);
    if (existed_item) {
      existed_item.quantity += 1;
      return {
        ...state,
        total: state.total + existed_item.price,
      };
    } else {
      let newTotal = state.total + addedItem.price;
      return {
        ...state,
        addedItems: [...state.addedItems, {...addedItem, quantity: 1}],
        total: newTotal,
      };
    }
  }
  if (action.type === 'ADD_QUANTITY') {
    let addedItem = state.items.find(item => item.id === action.id);
    let existed_item = state.addedItems.find(item => action.id === item.id);
    if (existed_item) {
      existed_item.quantity += 1;
      return {
        ...state,
        total: state.total + existed_item.price,
      };
    } else {
      let newTotal = state.total + addedItem.price;
      return {
        ...state,
        addedItems: [...state.addedItems, {...addedItem, quantity: 1}],
        total: newTotal,
      };
    }
  }
  if (action.type === 'SUB_QUANTITY') {
    let existed_item = state.addedItems.find(item => action.id === item.id);
    if (existed_item.quantity === 1) {
      let new_items = state.addedItems.filter(item => item.id !== action.id);
      let newTotal = state.total - existed_item.price;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
      };
    } else {
      existed_item.quantity -= 1;
      let newTotal = state.total - existed_item.price;
      return {
        ...state,
        total: newTotal,
      };
    }
  }
  if (action.type === 'USER_LOGIN') {
    console.log('!!action.id: ', !!action.id);
    return {...state, isUserLoggedIn: !!action.id};
  } else {
    return state;
  }
};
export default cartReducer;
