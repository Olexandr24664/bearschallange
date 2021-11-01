import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { Album, getAlbums, getPhotos, Photo } from '../../api'
import { Breadcrumb } from '../../components/Breadcrumbs'
import ErrorPlaceholder from '../../components/ErrorPlaceholder'
import LoaderPlaceholder from '../../components/LoaderPlaceholder'
import Pagination from '../../components/Pagination'
import { usePagionation } from '../../hooks'
import WithHeader from '../../layout/WithHeader'
import AlbumPhotoList from './List'

const defaultBreadcrumbs = [
  {
    to: '/',
    name: 'Home',
  },
  {
    to: '/albums',
    name: 'Albums',
  },
]

function AlbumPhotos(): JSX.Element {
  let { albumId } = useParams<{ albumId?: string }>()

  const [albumPhotos, setAlbumPhotos] = useState<{
    album: null | Album
    photos: Photo[]
  }>({
    album: null,
    photos: [],
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const {
    pagination,
    setPaginationTotalCount,
    paginationData,
    onPaginationChange,
  } = usePagionation()

  const breadcrumbs = useMemo<Breadcrumb[]>(
    () =>
      albumPhotos.album
        ? [...defaultBreadcrumbs, { name: albumPhotos.album.title }]
        : [...defaultBreadcrumbs],
    [albumPhotos]
  )

  useEffect(() => {
    async function loadAlbumPhotos() {
      if (!albumId) {
        setErrorMsg('Please select the album.')
        return
      }

      setIsLoading(true)

      try {
        const [{ albums }, { photos, totalCount }] = await Promise.all([
          getAlbums({ filter: { albumId } }),
          getPhotos({ pagination, albumId }),
        ])

        if (albums.length < 0) {
          setErrorMsg(`There are no album with album id ${albumId}`)
          setIsLoading(false)
          return
        }

        setAlbumPhotos({ album: albums[0], photos: photos })

        setPaginationTotalCount(totalCount)
      } catch (e) {
        console.error(e)
        setErrorMsg('Failed to load album photos. Please, reload the page.')
      }

      setIsLoading(false)
    }

    loadAlbumPhotos()
  }, [pagination, setPaginationTotalCount, albumId])

  function showContent(): JSX.Element {
    if (isLoading) {
      return <LoaderPlaceholder text="Loading album photos..." />
    }

    if (errorMsg) {
      return <ErrorPlaceholder error={errorMsg} />
    }

    return <AlbumPhotoList photos={albumPhotos.photos}></AlbumPhotoList>
  }

  function renderPagination(): JSX.Element {
    return (
      <Pagination
        pagination={paginationData}
        onPagination={onPaginationChange}
        className="mt-2 w-full justify-end "
      />
    )
  }

  return (
    <WithHeader breadcrumbs={breadcrumbs}>
      {!errorMsg && (
        <>
          <div className="my-2 text-lg text-center">
            Photos in album{' '}
            <span className="font-bold">{albumPhotos.album?.title}</span>
          </div>
          {renderPagination()}
        </>
      )}
      {showContent()}
      {renderPagination()}
    </WithHeader>
  )
}

export default AlbumPhotos
