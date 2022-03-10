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
    return (
      <>
        <p
          className="categories-header"
        >
          Categorias
        </p>
        <div className="all-catecories">
          {categoriesList.map(({ id, name }) => (
            <button
              type="button"
              key={ id }
              data-testid="category"
            >
              {name}
            </button>
          ))}
        </div>
      </>
    );
  }
}

export default Categories;
