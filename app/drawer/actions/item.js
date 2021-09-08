import {ADD_ITEM, DELETE_ITEM, UPDATE_ITEM} from './types';
 
export const addItem = (items,price ,code) =>({
    type:ADD_ITEM,
    data:items,
    code:code,
    price:price,
});

export const deleteItem = (key) =>({
    type:DELETE_ITEM,
    key:key
});

export const updateItem = (key, quantity) =>({
    type:UPDATE_ITEM,
    key:key,
    quantity:quantity
});