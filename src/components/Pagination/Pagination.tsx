import React, { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { usePagination } from '../../hooks/usePagination';
import { setCurrentPage } from '../../redux/reducers/repository-reducer';
import { AppDispatch, RootState } from '../../redux/store';

import styles from './styles/Pagination.module.scss';
import { PaginationPropsType } from './types';

const portionSize = 3;

export const Pagination: FC<PaginationPropsType> = props => {
  const { totalCount, perPage } = props;
  const defaultCurrentPage = useSelector<RootState, number>(
    state => state.repository.currentPage,
  );

  const dispatch = useDispatch<AppDispatch>();

  const {
    firstElement,
    lastElement,
    nextPage,
    prevPage,
    selectPage,
    pages,
    totalCountPages,
    currentPage,
  } = usePagination({ perPage, portionSize, totalCount, defaultCurrentPage });

  const handleClickNextPage = (): void => nextPage();

  const handleClickPrevPage = (): void => prevPage();

  const handleClickPage = (page: number): void => selectPage(page);

  const showLastPage = (): void => {};

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage }));
  }, [currentPage]);

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__pages}>
        <span>{firstElement}</span>-<span>{lastElement}</span> of{' '}
        <span>{totalCount}</span> items
      </div>
      <button
        className={
          currentPage <= portionSize
            ? `${styles.pagination__button} ${styles.disabled}`
            : styles.pagination__button
        }
        type="button"
        onClick={handleClickPrevPage}
        disabled={currentPage <= portionSize}
      >
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="#808080"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.41436 6.00008L7.70726 1.70718L6.29304 0.292969L0.585938 6.00008L6.29304 11.7072L7.70726 10.293L3.41436 6.00008Z" />
        </svg>
      </button>
      <div className={styles.pagination__inner}>
        <ul className={styles.pagination__list}>
          {pages.map(page => (
            <li
              key={`${page}-pagination`}
              role="presentation"
              className={
                page === currentPage
                  ? `${styles.pagination__item} ${styles.active}`
                  : styles.pagination__item
              }
              onClick={() => handleClickPage(page)}
              value={page}
            >
              {page}
            </li>
          ))}
        </ul>
        <span className={styles.pagination__span}>...</span>
        <span
          role="presentation"
          className={styles.pagination__totalPage}
          onClick={showLastPage}
        >
          {totalCountPages}
        </span>
      </div>
      <button
        className={
          currentPage >= totalCountPages
            ? `${styles.pagination__button} ${styles.disabled}`
            : styles.pagination__button
        }
        type="button"
        onClick={handleClickNextPage}
        disabled={currentPage >= totalCountPages}
      >
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="#808080"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.58564 6.99814L1.30579 11.304L2.72429 12.714L8.41405 6.98956L2.68966 1.29978L1.27973 2.71827L5.58564 6.99814Z" />
        </svg>
      </button>
    </div>
  );
};
