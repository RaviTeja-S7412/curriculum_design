import { authConstants } from "../actions/constants";

const initialState = {
    user_data: null,
    get_data : false,
    get_attr_data : false
};

export default (state = initialState, action) => {
    switch(action.type){
        case authConstants.GET_USERDATA:
            state = {
                ...state,
                user_data: action.payload,
                get_data : true
            }
            break;
        case authConstants.GET_ALL_HSNCODES_SUCCESS:
            state = {
                ...state,
                hsn_codes: action.payload,
            }
            break;
        case authConstants.GET_ALL_CITIES:
            state = {
                ...state,
                cities: action.payload,
            }
            break;
        case authConstants.GET_USERDATA_REFRESH:
            state = {
                ...state,
                user_data: null,
                get_data : false
            }
            break;
        case authConstants.GET_ALL_ATTRIBUTESBYNAME_REQUEST:
            state = {
                ...state,
                get_attr_data : false
            }
            break;
        case authConstants.GET_ALL_ATTRIBUTESBYNAME:
            state = {
                ...state,
                get_attr_data : true,
                attributes: action.payload,
            }
            break;
    }

    return state;
}