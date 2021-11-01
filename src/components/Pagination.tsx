import React, { useMemo } from 'react'
import classnames from 'classnames'
import { PaginationParams } from '../api'
import { PropsClassname } from '../types'

export type PaginationData = PaginationParams & { totalCount: number }

type PaginationProps = {
  pagination: PaginationData
  onPagination: (pagination: PaginationData) => void
} & PropsClassname

const defaultLimits: number[] = [5, 10, 15]

function Pagination({
  pagination,
  onPagination,
  className,
}: PaginationProps): JSX.Element | null {
  const { limit, page, totalCount } = pagination

  const totalPages = useMemo<number>(
    () => Math.ceil(totalCount / limit),
    [limit, totalCount]
  )

  const isLastPage = page === totalPages

  const isFirstPage = page === 1

  function onChangeLimit(e: React.ChangeEvent<HTMLSelectElement>) {
    onPagination({ ...pagination, limit: parseInt(e.target.value) })
  }

  function onPageNext() {
    onPagination({ ...pagination, page: page + 1 })
  }

  function onPagePrev() {
    onPagination({ ...pagination, page: page - 1 })
  }

  return totalPages === 0 ? null : (
    <div className={classnames('flex items-center mr-2', className)}>
      <button
        disabled={isFirstPage}
        onClick={onPagePrev}
        className={classnames('p-2 mr-2', { 'text-gray-300': isFirstPage })}
      >
        {'<'}
      </button>
      <button
        disabled={isLastPage}
        onClick={onPageNext}
        className={classnames('p-2 mr-2', { 'text-gray-300': isLastPage })}
      >
        {'>'}
      </button>
      <select
        name="pageLimitSelect"
        onChange={onChangeLimit}
        value={limit}
        className="mr-2"
      >
        {defaultLimits.map((pageLimit) => (
          <option key={pageLimit} value={pageLimit}>
            {pageLimit}
          </option>
        ))}
      </select>
      <div>
        Page {page} of {totalPages}
      </div>
    </div>
  )
}

export default React.memo(Pagination)
