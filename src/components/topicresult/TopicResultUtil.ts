import { SortState } from '@navikt/ds-react';
import { useState } from 'react';

import { TopicResponse } from '../../types/TopicResponse';

const useHandleSort = () => {
  const [sort, setSort] = useState<SortState | undefined>(undefined);
  const handleSort = (sortKey: string | undefined) => {
    if (sortKey) {
      setSort(
        sort && sortKey === sort.orderBy && sort.direction === 'descending'
          ? undefined
          : {
              orderBy: sortKey,
              direction:
                sort && sortKey === sort.orderBy && sort.direction === 'ascending' ? 'descending' : 'ascending',
            }
      );
    }
  };
  return { sort, handleSort };
};

const sortData = (data: TopicResponse[] | undefined, sort?: SortState) => {
  if (!sort || !data) {
    return data;
  }
  return data.slice().sort((a, b) => {
    if (sort) {
      const comparator = (a: any, b: any, orderBy: string) => {
        if (b[orderBy] < a[orderBy] || b[orderBy] === undefined) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      };

      return sort.direction === 'ascending' ? comparator(b, a, sort.orderBy) : comparator(a, b, sort.orderBy);
    }
    return 1;
  });
};

export { useHandleSort, sortData };
