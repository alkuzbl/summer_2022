import { useState } from 'react';

type UsePaginationType = {
  portionSize: number;
  totalCount: number;
  perPage: number;
  defaultCurrentPage: number;
};

type ReturnUsePaginationType = {
  pages: number[];
  prevPage: () => void;
  nextPage: () => void;
  selectPage: (page: number) => void;
  totalCountPages: number;
  currentPage: number;
  firstElement: number;
  lastElement: number;
};

const DEFAULT_NUMBER_PAGE = 1;
const DEFAULT_INDEX = 1;

export const usePagination = (options: UsePaginationType): ReturnUsePaginationType => {
  const { totalCount, perPage, portionSize, defaultCurrentPage } = options;
  const totalCountPages = Math.ceil(totalCount / perPage);

  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
  const [index, setIndex] = useState(DEFAULT_INDEX);

  let lastElement = currentPage * perPage;
  const firstElement = lastElement - perPage + 1;

  if (lastElement > totalCount) {
    lastElement = totalCount;
  }

  const dataPages: number[] = [];
  for (let i = 1; i <= totalCountPages; i += 1) {
    dataPages.push(i);
  }
  let pages: number[];

  if (totalCountPages < index + portionSize && totalCountPages >= portionSize) {
    pages = dataPages.slice(totalCountPages - portionSize, totalCountPages);
  } else if (totalCountPages < portionSize) {
    pages = dataPages.slice(0, totalCountPages);
  } else {
    pages = dataPages.slice(index - 1, index - 1 + portionSize);
  }

  const handleClickNextPage = (): void => {
    setIndex(prevState => prevState + portionSize);
    setCurrentPage(index - 1 + perPage);
  };

  const handleClickPrevPage = (): void => {
    if (index <= DEFAULT_INDEX) {
      setIndex(DEFAULT_INDEX);
      setCurrentPage(DEFAULT_NUMBER_PAGE);
    } else {
      setIndex(prevState => prevState - portionSize);
      setCurrentPage(index - 1);
    }
  };

  const handleClickPage = (numberPage: number): void => {
    if (pages.indexOf(numberPage) !== -1) {
      if (numberPage > totalCountPages) {
        setCurrentPage(totalCountPages);
      } else if (numberPage < 1) {
        setCurrentPage(1);
      } else {
        setCurrentPage(numberPage);
      }
    } else if (numberPage > totalCountPages) {
      setCurrentPage(totalCountPages);
    } else if (numberPage < 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(numberPage);
      setIndex(numberPage);
    }
  };

  return {
    pages,
    prevPage: handleClickPrevPage,
    nextPage: handleClickNextPage,
    selectPage: handleClickPage,
    totalCountPages,
    currentPage,
    firstElement,
    lastElement,
  };
};
