import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';
import style from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  state = {
    isModalOpen: false,
  };

  handleToggleModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    return (
      <li className={style.ImageGalleryItem}>
        <img
          onClick={this.handleToggleModal}
          className={style.ImageGalleryItemImage}
          src={this.props.webformatURL}
          alt={this.props.tags}
        />

        {this.state.isModalOpen && (
          <Modal onCloseModal={this.handleToggleModal}>
            <img src={this.props.largeImageURL} alt={this.props.tags} />
          </Modal>
        )}
      </li>
    );
  }
}