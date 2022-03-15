import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categoriesList: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categoriesList = await getCategories();
    this.setState({ categoriesList });
  }

  render() {
    const { categoriesList } = this.state;
    const { handleCatClick } = this.props;
    return (
      <aside className="categories-cont">
        <p
          className="categories-header"
        >
          Categorias
        </p>
        <div className="all-categories">
          {categoriesList.map(({ id, name }) => (
            <button
              type="button"
              key={ id }
              id={ id }
              data-testid="category"
              onClick={ handleCatClick }
            >
              {name}
            </button>
          ))}
        </div>
      </aside>
    );
  }
}

Categories.propTypes = {
  handleCatClick: PropTypes.func.isRequired,
};

export default Categories;
