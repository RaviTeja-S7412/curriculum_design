import { categoryConstansts } from "./constants";
import axios from "../helpers/axios";

export const get_categories = () => {

    return async (dispatch) => {

        dispatch({ type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST });
        const res = await axios.get(`/admin/get_categories`);

        if(res.status === 200){
            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
                payload: {categories : res.data.all_categories}
            });
        }else{
            if(res.status === 400){
                
                dispatch({
                    type: categoryConstansts.GET_ALL_CATEGORIES_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const add_category = (cat_data) => {

    return async (dispatch) => {

        dispatch({ type: categoryConstansts.ADD_NEW_CATEGORY_REQUEST });
        const res = await axios.post(`/admin/add_category`,cat_data);

        if(res.status === 200){
            dispatch({
                type: categoryConstansts.ADD_NEW_CATEGORY_SUCCESS,
                payload: {message : "Category Added Successfully"}
            });
            dispatch(get_categories());
        }else{
            if(res.status === 400){
                
                dispatch({
                    type: categoryConstansts.ADD_NEW_CATEGORY_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const update_category = (cat_data) => {

    return async (dispatch) => {

        dispatch({ type: categoryConstansts.UPDATE_CATEGORIES_REQUEST });
        const res = await axios.post(`/admin/update_category`,cat_data);

        if(res.status === 200){
            dispatch({
                type: categoryConstansts.UPDATE_CATEGORIES_SUCCESS,
                payload: {message : "Category Updated Successfully"}
            });
            dispatch(get_categories());
        }else{
            if(res.status === 400){
                
                dispatch({
                    type: categoryConstansts.UPDATE_CATEGORIES_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const get_categories_bydept = (cat_data) => {

    return async (dispatch) => {

        dispatch({ type: categoryConstansts.GET_CATEGORY_BYDEPTREQUEST });
        const res = await axios.post(`/admin/get_categories_by_dept`,cat_data);

        if(res.status === 200){
            dispatch({
                type: categoryConstansts.GET_CATEGORY_BYDEPTSUCCESS,
                payload: {categories : res.data.all_categories}
            });
        }else{
            if(res.status === 400){
                
                dispatch({
                    type: categoryConstansts.GET_CATEGORY_BYDEPTFAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const delete_category = (cat_data) => {

    return async (dispatch) => {

        dispatch({ type: categoryConstansts.DELETE_CATEGORIES_REQUEST });
        const res = await axios.post(`/admin/delete_category`,cat_data);

        if(res.status === 200){
            dispatch({
                type: categoryConstansts.DELETE_CATEGORIES_SUCCESS,
                payload: {message : "Category Deleted Successfully"}
            });
            dispatch(get_categories());
        }else{
            if(res.status === 400){
                
                dispatch({
                    type: categoryConstansts.DELETE_CATEGORIES_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}
