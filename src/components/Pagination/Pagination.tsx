import React, { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { usePagination } from '../../hooks/usePagination2';
import { setCurrentPage, setIndexPage } from '../../redux/reducers/repository-reducer';
import { AppDispatch, RootState } from '../../redux/store';
import { ArrowButton } from '../ArrowButton/ArrowButton';

import styles from './styles/Pagination.module.scss';
import { PaginationPropsType } from './types';

const portionSize = 3;

export const Pagination: FC<PaginationPropsType> = props => {
  const { totalCount, perPage } = props;
  const defaultCurrentPage = useSelector<RootState, number>(
    state => state.repository.currentPage,
  );
  const defaultIndex = useSelector<RootState, number>(
    state => state.repository.defaultIndex,
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
    index,
  } = usePagination({
    perPage,
    portionSize,
    totalCount,
    defaultCurrentPage,
    defaultIndex,
  });

  const handleClickNextPage = (): void => nextPage();

  const handleClickPrevPage = (): void => prevPage();

  const handleClickPage = (page: number): void => selectPage(page);

  const showLastPage = (): void => {};

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage }));
    dispatch(setIndexPage({ defaultIndex: index }));
  }, [currentPage, defaultIndex]);

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__pages}>
        <span>{firstElement}</span>-<span>{lastElement}</span> of{' '}
        <span>{totalCount}</span> items
      </div>
      <ArrowButton
        disabled={currentPage <= portionSize}
        onClick={handleClickPrevPage}
        isPrevArrow
      />
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
      <ArrowButton
        disabled={currentPage >= totalCountPages}
        onClick={handleClickNextPage}
        isPrevArrow={false}
      />
    </div>
  );
};
