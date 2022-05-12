import { useEffect, useState } from 'react';

type UsePaginationType = {
  defaultCurrentPage?: number;
  portionSize: number;
  totalCount: number;
  perPage: number;
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
export const usePagination = (options: UsePaginationType): ReturnUsePaginationType => {
  const { totalCount, defaultCurrentPage = 1, perPage, portionSize } = options;

  const totalCountPages = Math.ceil(totalCount / perPage);
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
  const [index, setIndex] = useState(defaultCurrentPage);

  let lastElement = currentPage * perPage;
  const firstElement = lastElement - perPage + 1;
  if (lastElement > totalCount) {
    lastElement = totalCount;
  }

  const pages: number[] = [];
  for (let i = 1; i <= totalCountPages; i += 1) {
    pages.push(i);
  }
  let newArr: number[];

  if (totalCountPages < index + portionSize && totalCountPages >= portionSize) {
    newArr = pages.slice(totalCountPages - portionSize, totalCountPages);
  } else if (totalCountPages < portionSize) {
    newArr = pages.slice(0, totalCountPages);
  } else {
    newArr = pages.slice(index - 1, index - 1 + portionSize);
  }

  const handleClickNextPage = (): void => {
    setIndex(prevState => prevState + 3);

    setCurrentPage(index - 1 + perPage);
  };

  const handleClickPrevPage = (): void => {
    if (index <= 1) {
      setIndex(1);
      setCurrentPage(1);
    } else {
      setIndex(index - 3);
      setCurrentPage(index);
    }
  };

  useEffect(() => {
    setCurrentPage(index);
  }, [index]);

  const handleClickPage = (numberPage: number): void => {
    if (newArr.indexOf(numberPage) !== -1) {
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
    pages: newArr,
    prevPage: handleClickPrevPage,
    nextPage: handleClickNextPage,
    selectPage: handleClickPage,
    totalCountPages,
    currentPage,
    firstElement,
    lastElement,
  };
};
