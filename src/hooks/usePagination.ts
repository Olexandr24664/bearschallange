import { useCallback, useMemo, useState } from 'react'
import { PaginationParams } from '../api'
import { PaginationData } from '../components/Pagination'

export const usePagionation = () => {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 10,
  })

  const [paginationTotalCount, setPaginationTotalCount] = useState<number>(0)

  const paginationData = useMemo<PaginationData>(
    () => ({ ...pagination, totalCount: paginationTotalCount }),
    [pagination, paginationTotalCount]
  )

  const onPaginationChange = useCallback(
    (newPagination: PaginationData) => setPagination(newPagination),
    [setPagination]
  )

  return {
    pagination,
    setPagination,
    setPaginationTotalCount,
    paginationData,
    onPaginationChange,
  }
}
