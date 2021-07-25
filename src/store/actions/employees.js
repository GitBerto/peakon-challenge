export const REQUEST_EMPLOYEES_POST = 'REQUEST_EMPLOYEES_POST';
export const RECEIVE_EMPLOYEES_POST = 'RECEIVE_EMPLOYEES_POST';
export const INVALIDATE_EMPLOYEES_POST = 'INVALIDATE_EMPLOYEES_POST';

export const requestEmployees = apiUrl => ({
    type: REQUEST_EMPLOYEES_POST,
    apiUrl
});

export const receiveEmployees = (apiUrl, json) => {
    const data = json.data;
    const included = json.included;
    
    const dataMap = data.map(item => {
        const itemAttributes = item.attributes;
        const accountId = item?.relationships?.account?.data?.id || 0;
        const includedAttributes = included.filter(item => (
            item.id === accountId
        ))[0];
        return {
            firstName: itemAttributes.firstName,
            lastName: itemAttributes.lastName,
            name: itemAttributes.name,
            email: includedAttributes?.attributes.email,
        }
    });

    return {
        type: RECEIVE_EMPLOYEES_POST,
        posts: dataMap,
        apiUrl
    }
};

export const invalidateEmployees = apiUrl => ({
    type: INVALIDATE_EMPLOYEES_POST,
    apiUrl
});

const fetchEmployeesPost = apiUrl => dispatch => {
    dispatch(requestEmployees(apiUrl));
    return fetch(apiUrl)
        .then(response => response.json())
        .then(json => dispatch(receiveEmployees(apiUrl, json)))
}

const shouldFetchPosts = (state) => {
    const posts = state?.postsByEmployees?.employees?.items;
    if (!posts || posts.length === 0) {
        return true;
    }

    return false;
}

export const fetchEmployees = apiUrl => (dispatch, getState) => {
    if (shouldFetchPosts(getState())){
        return dispatch(fetchEmployeesPost(apiUrl));
    }
}

export const EMPLOYEES_FILTER = 'EMPLOYEES_FILTER';

export const employeesFilter = (searchValue, items = {}) => {

    const getFormatValue = val => (
        val.replace(/\s/g, '').toLowerCase()
    );

    const searchValueFormatted = getFormatValue(searchValue);
    const itemsFiltered = items.filter(item => {
        const name = item.name;
        const emplyeeFullNameFormatted = name ? getFormatValue(name) : '';
        return emplyeeFullNameFormatted.indexOf(searchValueFormatted) > -1 || searchValueFormatted === '';
    });

    return {
        type: EMPLOYEES_FILTER,
        itemsFiltered: itemsFiltered,
        searchValue: searchValue
    }
}
