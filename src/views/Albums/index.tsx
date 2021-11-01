import { useEffect, useState } from 'react'
import { Album, getAlbums } from '../../api'
import { Breadcrumb } from '../../components/Breadcrumbs'
import ErrorPlaceholder from '../../components/ErrorPlaceholder'
import LoaderPlaceholder from '../../components/LoaderPlaceholder'
import Pagination from '../../components/Pagination'
import { usePagionation } from '../../hooks'
import WithHeader from '../../layout/WithHeader'
import AlbumsList from './List'

const breadcrumbs: Breadcrumb[] = [
  {
    to: '/',
    name: 'Home',
  },
  {
    to: '/albums',
    name: 'Albums',
  },
]

function Albums(): JSX.Element {
  const [albums, setAlbums] = useState<Album[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const {
    pagination,
    setPaginationTotalCount,
    paginationData,
    onPaginationChange,
  } = usePagionation()

  useEffect(() => {
    async function loadAlbums() {
      setIsLoading(true)

      try {
        const response = await getAlbums({ pagination })
        setAlbums(response.albums)
        setPaginationTotalCount(response.totalCount)
      } catch (e) {
        console.error(e)
        setIsError(true)
      }

      setIsLoading(false)
    }

    loadAlbums()
  }, [pagination, setPaginationTotalCount])

  function showContent() {
    if (isLoading) {
      return <LoaderPlaceholder text="Loading albums..." />
    }

    if (isError) {
      return (
        <ErrorPlaceholder error="Failed to load albums. Please, reload the page." />
      )
    }

    return <AlbumsList albums={albums}></AlbumsList>
  }

  function renderPagination(): JSX.Element {
    return (
      <Pagination
        pagination={paginationData}
        onPagination={onPaginationChange}
        className="mt-2 justify-end"
      />
    )
  }

  return (
    <WithHeader breadcrumbs={breadcrumbs}>
      <div className="my-2 flex flex-wrap items-center justify-between">
        <span className="font-bold text-lg ">All your albums</span>
        {renderPagination()}
      </div>
      {showContent()}
      {renderPagination()}
    </WithHeader>
  )
}

export default Albums
