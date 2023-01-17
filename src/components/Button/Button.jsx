import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './Button.module.css';

export class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  render() {
    return (
      <button type="button" className={style.Button} onClick={this.props.onClick}>
        Load more
      </button>
    );
  }
}