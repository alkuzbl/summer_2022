import { useEffect, useState } from 'react';

type UsePaginationType = {
  portionSize: number;
  totalCount: number;
  perPage: number;
  defaultCurrentPage: number;
};

type ReturnUsePaginationType = {
  pages: number[];
  onClickArrowButton: (isArrowNextButton: boolean) => void;
  onClickSelectPage: (page: number) => void;
  totalCountPages: number;
  currentPage: number;
  minPageValue: number;
  maxPageValue: number;
};

export const usePagination = (options: UsePaginationType): ReturnUsePaginationType => {
  const { totalCount, perPage = 4, portionSize = 3, defaultCurrentPage } = options;

  const [portionNumber, setPortionNumber] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(defaultCurrentPage);

  const totalCountPages = Math.ceil(totalCount / perPage);

  let maxPageValue: number;
  if (currentPage * perPage >= totalCount) {
    maxPageValue = totalCount;
  } else {
    maxPageValue = currentPage * perPage;
  }

  let minPageValue: number;
  if (maxPageValue - (perPage - 1) <= 1) {
    minPageValue = 1;
  } else {
    minPageValue = maxPageValue - (perPage - 1);
  }

  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  const pages = [];
  for (let i = 1; i <= totalCountPages; i += 1) {
    pages.push(i);
  }

  const nextPage = portionSize * portionNumber + 1;
  const prevPage = (portionNumber - 1) * portionSize;

  const onClickArrowButton = (isArrowNextButton: boolean): void => {
    if (isArrowNextButton) {
      if (nextPage >= totalCountPages) {
        setCurrentPage(totalCountPages);
        setPortionNumber(portionNumber + 1);
      } else {
        setCurrentPage(nextPage);
        setPortionNumber(portionNumber + 1);
      }
    } else if (prevPage <= 1) {
      setCurrentPage(1);
      setPortionNumber(1);
    } else {
      setPortionNumber(portionNumber - 1);
      setCurrentPage(prevPage);
    }
  };
  console.log('nextPage', nextPage);
  console.log('portionNumber', portionNumber);
  console.log('prevPage', prevPage);

  const onClickSelectPage = (numberPage: number): void => {
    setCurrentPage(numberPage);
  };

  useEffect(() => {
    setCurrentPage(defaultCurrentPage);
  }, []);

  return {
    pages: pages.filter(
      page => page >= leftPortionPageNumber && page <= rightPortionPageNumber,
    ),
    onClickArrowButton,
    onClickSelectPage,
    totalCountPages,
    currentPage,
    minPageValue,
    maxPageValue,
  };
};
