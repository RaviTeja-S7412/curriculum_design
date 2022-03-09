import { categoryConstansts } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    get_data : false,
    error: null
};

export default (state = initState, action) => {
    switch(action.type){
        case categoryConstansts.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories,
                get_data : true,    
            }
            break;
        case categoryConstansts.GET_CATEGORY_BYDEPTSUCCESS:
            state = {
                ...state,
                dept_categories: action.payload.categories,
                get_data : true,    
            }
            break;
        case categoryConstansts.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstansts.ADD_NEW_CATEGORY_SUCCESS:
            
            state = {
                ...state,
                loading: false,
                get_data : false
            }
            break;
        case categoryConstansts.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...initState,
                loading: false,
                error: action.payload.error
            }
            break;
        case categoryConstansts.UPDATE_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstansts.UPDATE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories,
                loading: false,
                get_data : false,
            }
            break;
        case categoryConstansts.UPDATE_CATEGORIES_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case categoryConstansts.DELETE_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstansts.DELETE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false,
                get_data : false
            }
            break;
        case categoryConstansts.DELETE_CATEGORIES_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }

    return state;
}