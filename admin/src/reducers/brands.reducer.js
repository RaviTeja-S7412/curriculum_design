import { brandConstansts } from "../actions/constants";

const initState = {
    brands: [],
    get_data : false,
    error: null
};

export default (state = initState, action) => {
    switch(action.type){
        case brandConstansts.GET_ALL_BRANDS_SUCCESS:
            state = {
                ...state,
                brands: action.payload,
                get_data : true,    
            }
            break;
        case brandConstansts.ADD_NEW_BRAND_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case brandConstansts.ADD_NEW_BRAND_SUCCESS:
            
            state = {
                ...state,
                loading: false,
                get_data : false
            }
            break;
        case brandConstansts.ADD_NEW_BRAND_FAILURE:
            state = {
                ...initState,
                loading: false,
                error: action.payload.error
            }
            break;
        case brandConstansts.UPDATE_BRANDS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case brandConstansts.UPDATE_BRANDS_SUCCESS:
            state = {
                ...state,
                brands: action.payload.brands,
                loading: false,
                get_data : false,
            }
            break;
        case brandConstansts.UPDATE_BRANDS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case brandConstansts.DELETE_BRANDS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case brandConstansts.DELETE_BRANDS_SUCCESS:
            state = {
                ...state,
                loading: false,
                get_data : false
            }
            break;
        case brandConstansts.DELETE_BRANDS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }

    return state;
}