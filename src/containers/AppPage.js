import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees, employeesFilter } from '../store/actions/employees';
import DropDownSearchList from '../components/DropDownSearchList';
import '../styles/theme.scss';

const apiUrl = 'https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json';

const App = (props) => {
    const {dispatch} = props;
    useEffect(() => {
        dispatch(fetchEmployees(apiUrl));
    }, [dispatch]);

    const dropDownSearchListProps = {
        label: 'Manager',
        placeholder: 'Choose your manager',
        filterListDispatcher: value => {
            dispatch(employeesFilter(value, props.items))
        },
        itemsFiltered: props.itemsFiltered,
        value: props.searchValue,
    }

    return (
        <div className="App">
            <DropDownSearchList {...dropDownSearchListProps}/>
        </div>
    )
}

const mapStateToProps = state => {
    const {postsByEmployees, filterBySearch} = state;
    const {isFetching, lastUpdated, items} = postsByEmployees?.employees || {isFetching: false, items: []}
    const {itemsFiltered = [], searchValue} = filterBySearch || '';

    return {isFetching, lastUpdated, items, itemsFiltered, searchValue}
}
  
export default connect(mapStateToProps)(App)
