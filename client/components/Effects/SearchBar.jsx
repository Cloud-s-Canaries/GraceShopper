import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {useCombobox} from 'downshift'
import {getProductsThunk} from '../../store/allProducts'
import {getItemThunk} from '../../store/singleProduct'
import {Input} from 'antd'
import {Search} from '@material-ui/icons'

function Searchbar({loadMemes, memes}) {
  const [inputItems, setInputItems] = useState([])
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({inputValue}) => {
      setInputItems(
        memes.filter(item =>
          item.name.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      )
    }
  })

  return (
    <div className="SearchRender">
      <div>
        <div {...getComboboxProps()} className="searchbutton-cont">
          <Input
            {...getInputProps()}
            placeholder="Search"
            size="large"
            className="searchinput"
          />
          <Link to="">
            <Search className="searchIcon" />
          </Link>
        </div>
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => (
            <span key={item.id} {...getItemProps({item, index})}>
              <li
                style={highlightedIndex === index ? {background: '#ede'} : {}}
              >
                <Link to={`/products/${item.id}`}>
                  {' '}
                  <h4>{item.name}</h4>
                </Link>
              </li>
            </span>
          ))}
      </ul>
    </div>
  )
}

function searchFilter(terms, targ) {
  terms.filter(val => {
    if (targ == '') {
      return val
    } else if (val.name.toLowerCase().includes(targ.toLowerCase())) {
      return val
    }
  })
}

const mapState = state => {
  return {
    memes: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    loadMemes: () => dispatch(getProductsThunk())
    //loadTheMeme: () => dispatch(getItemThunk()),
  }
}

export default connect(mapState, mapDispatch)(Searchbar)
