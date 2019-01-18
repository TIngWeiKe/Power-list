
import {
    get_Access_Token,
    get_KKbox_API,
    doCookieSetup,
    getCookie
} from '../component/getKKboxAPI'

const CATEGORY_BOX_API_SUCCESS = 'CATEGORY_BOX_API_SUCCESS'
const CATEGORY_BOX_API_ERROR_MSG = 'CATEGORY_BOX_API_ERROR_MSG'
const INIT_STATE = 'INIT_STATE'

const initState = {
    category_box_data: {},
    msg: '',
    bool: true,
    access_token: '',
    title:'今日精選'
}


export function category_box(state = initState, action) {
    switch (action.type) {
        case CATEGORY_BOX_API_SUCCESS:
            return state = { ...state, bool: false, msg: "success", ...action.payload }
        case CATEGORY_BOX_API_ERROR_MSG:
            return state = { ...state, msg: '伺服器錯誤', bool: false }
        case INIT_STATE:
            return state= initState
        default:
            return state
    }
}



export function get_Category_Box_api_Api_Success(category_box_data) {
    return { type: CATEGORY_BOX_API_SUCCESS, payload: category_box_data }
}

export function get_Category_Box_api_Api_Error() {
    return { type: CATEGORY_BOX_API_ERROR_MSG }
}



export function get_Category_Box_api(url) {
    return dispatch => { 
        let access_token;
        !getCookie('token') ? get_Access_Token()
            .then(data => {
                doCookieSetup('token', data.access_token, data.expires_in)
                get_KKbox_API(data.access_token, url)
                    .then(res => {
                        if (res && res.status === 200) {
                            dispatch(get_Category_Box_api_Api_Success({ category_box_data: res.data }))
                        } else {
                            dispatch(get_Category_Box_api_Api_Error())
                            console.log('err')
                        }
                    })
            }) :

            get_KKbox_API(getCookie('token'), url)
                .then(res => {
                    if (res && res.status === 200) {
                        dispatch(get_Category_Box_api_Api_Success({ category_box_data: res.data }))
                    } else {
                        dispatch(get_Category_Box_api_Api_Error())
                    }
                })


    }
}

export function handle_Init_State(){
    return {type:INIT_STATE}
}

