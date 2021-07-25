import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types'
import './index.scss';

const DropDown = (props) => {
    const searchInput = useRef(null);
    const resultList = useRef(null);
    const { itemsFiltered, filterListDispatcher } = props;
    const [isFocused, setIsfocused] = useState(false);
    const [index, setIndex] = useState(-1);

    useEffect(() => {
        setIndex(-1);
    }, [itemsFiltered])


    const updateIndex = (pos) => {
        const itemsFilteredLenght = props.itemsFiltered.length;
        if ((pos > 0 && index + pos < itemsFilteredLenght) ||
            (pos < 0 && index + pos > -1)) {
            resultList.current.scrollTop = 84 * (index + pos);
            setIndex(index + pos);
        }
    }

    const selectIndex = (i = index) => {
        if (i > -1) {
            const name = props.itemsFiltered[i].name;
            filterListDispatcher(name);
            setIsfocused(false);
            searchInput.current.blur();
        }
    }

    const keyDownManager = (e) => {
        const keyCode = e.keyCode;
        switch (keyCode) {
            case 13:
                selectIndex();
                break;
            case 38:
                updateIndex(-1);
                break;
            case 40:
                updateIndex(+1);
                break;
            default:
                break;
        }
    }

    return (
        <div className="drop-down">
            <div className="drop-down__search">
                <label className="drop-down__label">{props.label}</label>
                <div className="drop-down__input-container">
                    <input 
                        type="text" 
                        value={props.value || ''} 
                        onChange={e => filterListDispatcher(e.target.value)}
                        onFocus={() => {
                            filterListDispatcher(searchInput.current.value); setIsfocused(true)}
                        }
                        onBlur={() => setIsfocused(false)}
                        onKeyDown={e => keyDownManager(e)}
                        placeholder={props.placeholder} 
                        ref={searchInput}   
                    />
                    <div className={`drop-down__arrow ${isFocused ? 'drop-down__arrow--down' : 'drop-down__arrow--up'}`}></div>
                </div>
            </div>
            <div className={`drop-down__results ${props.itemsFiltered.length && isFocused && 'drop-down__results--show'}`} ref={resultList}>
                { props.itemsFiltered.map((item, i) => (
                    <button className={`drop-down__item ${i === index && 'drop-down__item--selected'}`} key={i} onMouseDown={() => selectIndex(i)}>
                        <div className="drop-down__item-container">
                            <div>
                                <div className="drop-down__item-icon">
                                    {item.firstName[0]}
                                    {item.lastName[0]}
                                </div>
                            </div>
                            <div className="drop-down__item-content">
                                <div>
                                    <span className="drop-down__item-fullname">{item.name}</span> 
                                    <span className="drop-down__item-email">{item.email}</span>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

DropDown.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    filterListDispatcher: PropTypes.func.isRequired,
    itemsFiltered: PropTypes.array,
    value: PropTypes.string,
  };
  
export default DropDown;
