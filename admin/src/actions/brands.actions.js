import { brandConstansts } from "./constants";
import axios from "../helpers/axios";

export const get_brands = () => {

    return async (dispatch) => {

        const res = await axios.get(`/admin/get_brands`);

        if(res.status === 200){
            dispatch({
                type: brandConstansts.GET_ALL_BRANDS_SUCCESS,
                payload: res.data.all_brands
            });
        }else{
            if(res.status === 400){
                dispatch({
                    type: brandConstansts.GET_ALL_BRANDS_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const add_brand = (cat_data) => {

    return async (dispatch) => {

        dispatch({ type: brandConstansts.ADD_NEW_BRAND_REQUEST });
        const res = await axios.post(`/admin/add_brand`,cat_data);

        if(res.status === 200){
            dispatch({
                type: brandConstansts.ADD_NEW_BRAND_SUCCESS,
                payload: {message : "Brand Added Successfully"}
            });
            dispatch(get_brands());
        }else{
            if(res.status === 400){
                
                dispatch({
                    type: brandConstansts.ADD_NEW_BRAND_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const update_brand = (cat_data) => {

    return async (dispatch) => {

        dispatch({ type: brandConstansts.UPDATE_BRANDS_REQUEST });
        const res = await axios.post(`/admin/update_brand`,cat_data);

        if(res.status === 200){
            dispatch({
                type: brandConstansts.UPDATE_BRANDS_SUCCESS,
                payload: {message : "Brand Updated Successfully"}
            });
            dispatch(get_brands());
        }else{
            if(res.status === 400){
                
                dispatch({
                    type: brandConstansts.UPDATE_BRANDS_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const delete_brand = (cat_data) => {

    return async (dispatch) => {

        dispatch({ type: brandConstansts.DELETE_BRANDS_REQUEST });
        const res = await axios.post(`/admin/delete_brand`,cat_data);

        if(res.status === 200){
            dispatch({
                type: brandConstansts.DELETE_BRANDS_SUCCESS,
                payload: {message : "Brand Deleted Successfully"}
            });
            dispatch(get_brands());
        }else{
            if(res.status === 400){
                
                dispatch({
                    type: brandConstansts.DELETE_BRANDS_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}
