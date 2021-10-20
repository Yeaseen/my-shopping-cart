import React, { createContext, useReducer } from 'react'
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export enum Types {
  Create = 'CREATE_PRODUCT',
  Delete = 'DELETE_PRODUCT',
  Increase = 'INCREASE_PRODUCT',
  Decrease = 'DECREASE_PRODUCT',
  DeleteALL = 'DELETEALL_PRODUCT'
}

type ProductType = {
  id: number
  title: string
  price: number
  count: number
  picture: string
}

type ProductPayload = {
  [Types.Create]: {
    id: number
    title: string
    price: number
    picture: string
    count: number
  }
  [Types.Delete]: {
    id: number
  }
  [Types.Increase]: {
    id: number
  }
}

export type ProductActions =
  ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>]

export const productReducer = (state, action) => {
  switch (action.type) {
    case Types.Create:
      return [
        ...state,
        {
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          picture: action.payload.picture,
          count: action.payload.count
        }
      ]
    case Types.Delete:
      return [...state.filter((product) => product.id !== action.payload.id)]
    case Types.Increase:
      return [
        ...state.map((product) =>
          product.id === action.payload.id
            ? { ...product, count: product.count + 1 }
            : product
        )
      ]
    case Types.Decrease:
      return [
        ...state.map((product) =>
          product.id === action.payload.id
            ? { ...product, count: product.count - 1 }
            : product
        )
      ]
    case Types.DeleteALL:
      return []
    default:
      return state
  }
}

// export const productReducer = (state, action) => {
//     switch (action.type) {
//         case 'CREATE_PRODUCT':
//             return [
//                 ...state,
//                 {
//                     id: action.payload.id,
//                     title: action.payload.title,
//                     price: action.payload.price,
//                     picture: action.payload.picture,
//                     count: 1
//                 }
//             ]
//         case 'DELETE_PRODUCT':
//             return [
//                 ...state.filter(product => product.id !== action.payload.id),
//             ]
//         // case 'INCREASE_PRODUCT':
//         //     return [
//         //         ...state,
//         //         {
//         //             count: action.count + 1
//         //         }
//         //     ]
//         // case 'DECREASE_PRODUCT':
//         //     if (state.quantity > 0) {
//         //         return {
//         //             ...state,
//         //             count: action.count - 1
//         //         };
//         //     }
//         default:
//             return state;
//     }
// }
