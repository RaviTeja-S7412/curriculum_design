import { productConstants } from "./constants";
import axios from "../helpers/axios";

export const get_products = () => {

    return async (dispatch) => {

        dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
        const res = await axios.get(`/admin/get_products`);

        if(res.status === 200){
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: {products : res.data.all_products}
            });
        }else{
            if(res.status === 400){
                
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const add_product = (data) => {

    return async (dispatch) => {

        dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
        const res = await axios.post(`/admin/add_product`,data,{'Content-Type': 'multipart/form-data'}
        );

        if(res.status === 200){
            dispatch({
                type: productConstants.ADD_PRODUCT_SUCCESS,
                payload: {message : "Product Added Successfully"}
            });
            dispatch(get_products());
        }else{
            if(res.status === 400){
                
                dispatch({
                    type: productConstants.ADD_PRODUCT_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const update_product = (data) => {

    return async (dispatch) => {

        dispatch({ type: productConstants.UPDATE_PRODUCT_REQUEST });
        const res = await axios.post(`/admin/update_product`,data);

        if(res.status === 200){
            dispatch({
                type: productConstants.UPDATE_PRODUCT_SUCCESS,
                payload: {message : "Product Updated Successfully"}
            });
            dispatch(get_products());
        }else{
            if(res.status === 400){
                
                dispatch({
                    type: productConstants.UPDATE_PRODUCT_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const get_productbyid = (data) => {

    return async (dispatch) => {

        dispatch({ type: productConstants.GET_PRODUCTBYID_REQUEST });
        const res = await axios.post(`/admin/get_productbyid`,data);

        if(res.status === 200){
            dispatch({
                type: productConstants.GET_PRODUCTBYID_SUCCESS,
                payload: {productbyid : res.data.product}
            });
        }else{
            if(res.status === 400){
                
                dispatch({
                    type: productConstants.GET_PRODUCTBYID_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const delete_product = (data) => {

    return async (dispatch) => {

        dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_REQUEST });
        const res = await axios.post(`/admin/delete_product`,data);

        if(res.status === 200){
            dispatch({
                type: productConstants.DELETE_PRODUCT_BY_ID_SUCCESS,
                payload: {message : "Product Deleted Successfully"}
            });
            dispatch(get_products());
        }else{
            if(res.status === 400){
                
                dispatch({
                    type: productConstants.DELETE_PRODUCT_BY_ID_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}
