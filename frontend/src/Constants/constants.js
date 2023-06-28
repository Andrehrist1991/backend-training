const { freeze } = Object;

export const SALE_TYPES = freeze({
  retail: 'Retail',
  wholesale: 'Wholesale',
});

export const SALES_PROVIDERS = freeze({
  provider_1: 'Provider 1',
  provider_2: 'Provider 2',
});


export const ORDER_STATUS = freeze({
  expired: 'Expired',
  failed: 'Failed',
  finished: 'Finished',
  new: 'New',
  waiting: 'Waiting',
});

export const SORT_DIRECTIONS = freeze({
  asc: 'asc',
  desc: 'desc',
});
