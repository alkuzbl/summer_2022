import React, { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { usePagination } from '../../hooks/usePagination';
import { setCurrentPage } from '../../redux/reducers/repository-reducer';
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

  const dispatch = useDispatch<AppDispatch>();

  const {
    currentPage,
    pages,
    totalCountPages,
    minPageValue,
    maxPageValue,
    onClickSelectPage,
    onClickArrowButton,
  } = usePagination({
    perPage,
    portionSize,
    totalCount,
    defaultCurrentPage,
  });

  const handleClickNextPage = (): void => onClickArrowButton(true);

  const handleClickPrevPage = (): void => onClickArrowButton(false);

  const handleClickPage = (page: number): void => onClickSelectPage(page);

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage }));
  }, [currentPage]);

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__pages}>
        <span>{minPageValue}</span>-<span>{maxPageValue}</span> of{' '}
        <span>{totalCount}</span> items
      </div>
      <ArrowButton
        disabled={currentPage <= 1}
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
        <span className={styles.pagination__totalPage}>{totalCountPages}</span>
      </div>
      <ArrowButton
        disabled={currentPage >= totalCountPages}
        onClick={handleClickNextPage}
        isPrevArrow={false}
      />
    </div>
  );
};
