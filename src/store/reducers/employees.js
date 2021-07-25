import {
    REQUEST_EMPLOYEES_POST, RECEIVE_EMPLOYEES_POST, INVALIDATE_EMPLOYEES_POST,
    EMPLOYEES_FILTER,
} from '../actions/employees'

const posts = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case INVALIDATE_EMPLOYEES_POST:
            return {
                ...state,
                didInvalidate: true
            }
        case REQUEST_EMPLOYEES_POST:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_EMPLOYEES_POST:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
            }
        default:
            return state
    }
}

export const postsByEmployees = (state = {}, action) => {
    switch (action.type) {
        case INVALIDATE_EMPLOYEES_POST:
        case RECEIVE_EMPLOYEES_POST:
        case REQUEST_EMPLOYEES_POST:
            return {
                ...state,
                employees: posts(state['employees'], action)
            }
        default:
            return state
    }
}

export const filterBySearch = (state = {}, action) => {
    switch (action.type) {
        case EMPLOYEES_FILTER: 
            return {
                ...state,
                itemsFiltered: action.itemsFiltered,
                searchValue: action.searchValue,
            }
        default:
            return state
    }   
}
