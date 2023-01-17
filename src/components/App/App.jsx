import { ImageFinder } from '../ImageFinder/ImageFinder';

import style from './App.module.css';

export const App = () => {
  return (
    <div className={style.container}>
      <ImageFinder />
    </div>
  );
};
