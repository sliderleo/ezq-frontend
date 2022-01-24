import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from "../actions/types";

const initialState = {
    itemList:[]
}

const cartReducer = (state = initialState, action)=>{
    switch(action.type){
        case ADD_ITEM:
            return{
                ...state,
                itemList: state.itemList.concat({
                    key: Math.random(),
                    name:action.data,
                    code:action.code,
                    price:action.price
                })
            };
        case DELETE_ITEM:
            return{
                ...state,
                itemList: state.itemList.filter((item) =>
                item.key!== action.key)
            };
        case UPDATE_ITEM:
            return{
                ...state,
                itemList: state.itemList.map((item) => {
                    if (item.key === action.key) {
                       return action.quantity;
                    }
                    return item;
                })
            };    
        default:
            return state;
    }
}

export default cartReducer;