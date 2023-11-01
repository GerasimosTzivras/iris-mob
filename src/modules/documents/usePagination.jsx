import { useMemo } from 'react'

export const defaultPaginationOptions = {
  pageSizes: [10, 15, 20, 25, 50, 100],
  pageSizeOptionsDisplay: (pageSize) => `${pageSize} εγγραφές / σελίδα`,
  pageDisplay: (firstItem, lastItem, total) =>
    `${firstItem}-${lastItem} από ${total}`
}

export function usePagination(
  total = 0,
  params,
  onChangeParams,
  options = defaultPaginationOptions
) {
  let page = 1
  let pageSize = 10
  if (params !== undefined) {
    page = params.pageNumber
    pageSize = params.pageSize
  }
  const pageSizeOptions = useMemo(
    () =>
      options.pageSizes.map((i) => ({
        value: i,
        label: options.pageSizeOptionsDisplay(i)
      })),
    [options]
  )

  const pageDisplay = useMemo(() => {
    const firstItem = total === 0 ? 0 : (page - 1) * pageSize + 1
    console.debug({ page, pageSize, firstItem })
    const lastItem = page * pageSize < total ? page * pageSize : total
    return options.pageDisplay(firstItem, lastItem, total)
  }, [options, page, pageSize, total])

  const onPageSizeChange = (value) =>
    onChangeParams(
      Object.assign({}, params, {
        pageSize: value,
        pageNumber: 1
      })
    )

  const onPageChange = (value) =>
    onChangeParams(
      Object.assign({}, params, {
        pageNumber: value
      })
    )

  return {
    page,
    pageSize,
    pageSizeOptions,
    pageDisplay,
    onPageChange,
    onPageSizeChange
  }
}
