import React, { Component } from 'react';

import { api } from '../services/api';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from '../Loader/Loader';
import { ImageGalleryList } from '../ImageGallery/ImageGalleryList';
import { Button } from '../Button/Button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import style from './ImageFinder.module.css';

const Status = Object.freeze({
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
});

export class ImageFinder extends Component {
  state = {
    search: '',
    page: 1,
    totalImages: null,
    images: [],
    error: null,
    status: Status.IDLE,
  };

  handleFormSubmit = search => {
    this.setState({ search, images: [], page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, search } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ status: Status.PENDING });

      api
        .fetchImages(search, page)
        .then(({ data }) => {
          if (prevState.search !== search) {
            if (data.hits <= 0) {
              toast.info(`По вашому запиту нічого не знайдено "${search}"`);
              this.setState({
                error: 'not found',
                status: Status.REJECTED,
              });
              return;
            } else {
              toast.info(`По запиту ${search} знайдено "${data.total}" зображень   `);
            }

            this.setState({
              images: data.hits,
              totalImages: data.total,
              status: Status.RESOLVED,
            });
          }

          if (prevState.page !== page) {
            this.setState(prevState => ({
              images: [...prevState.images, ...data.hits],
              totalImages: data.total,
              status: Status.RESOLVED,
            }));
          }
        })
        .catch(error =>
          this.setState({ error: error.message, status: Status.REJECTED })
        );
    }
  }

  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { page, totalImages, images, status, error } = this.state;

    const isShowButton = page * 12 < totalImages ? true : false;

    return (
      <div className={style.box}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {images.length > 0 && <ImageGalleryList images={images} />}

        {status === 'pending' && <Loader />}

        {status === 'resolved' && isShowButton && (
          <Button onClick={this.handleLoadMoreClick} />
        )}

        {status === 'rejected' && (
          <>
            <p className={style.error}>
              Error message: <span className={style.errorMessage}>{error}</span>
            </p>
          </>
        )}

        <ToastContainer autoClose={3000} theme="dark" />
      </div>
    );
  }
}