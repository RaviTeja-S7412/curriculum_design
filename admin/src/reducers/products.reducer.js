import { productConstants } from "../actions/constants";

const initState = {
    products: [],
    productbyid: [],
    loading: false,
    get_data : false,
    get_product_byid : false,
    error: null
};

export default (state = initState, action) => {
    switch(action.type){
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                get_data : true,    
            }
            break;
        case productConstants.ADD_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.ADD_PRODUCT_SUCCESS:
            
            state = {
                ...state,
                loading: false,
                get_data : false
            }
            break;
        case productConstants.ADD_PRODUCT_FAILURE:
            state = {
                ...initState,
                loading: false,
                error: action.payload.error
            }
            break;
        case productConstants.UPDATE_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.UPDATE_PRODUCT_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                loading: false,
                get_data : false,
            }
            break;
        case productConstants.UPDATE_PRODUCT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case productConstants.DELETE_PRODUCT_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.DELETE_PRODUCT_BY_ID_SUCCESS:
            state = {
                ...state,
                loading: false,
                get_data : false
            }
            break;
        case productConstants.DELETE_PRODUCT_BY_ID_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case productConstants.GET_PRODUCTBYID_REQUEST:
            state = {
                ...state,
                loading: true,
                get_product_byid : false
            }
            break;
        case productConstants.GET_PRODUCTBYID_SUCCESS:
            state = {
                ...state,
                loading: false,
                productbyid : action.payload.productbyid, 
                get_product_byid : true
            }
            break;
        case productConstants.DELETE_PRODUCT_BY_ID_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }

    return state;
}