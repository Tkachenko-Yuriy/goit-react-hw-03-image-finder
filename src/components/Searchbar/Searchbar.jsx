import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './Searchbar.module.css';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    search: '',
  };

  handleInputChange = e => {
    this.setState({ search: e.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.search);
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={style.SearchFormButton}>
            <span className={style.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={style.SearchFormInput}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Пошук зображень та фото"
            onChange={this.handleInputChange}
            value={this.state.search}
          />
        </form>
      </header>
    );
  }
}