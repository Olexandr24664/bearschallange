import { api } from './axios'

const URLS = {
  albums: 'albums',
  albumPhotos: (albumId: number | string): string =>
    `${URLS.albums}/${albumId}/photos`,
}

const HEADER_TOTAL_ELEMENTS_COUNT = 'x-total-count'

export type Album = {
  userId: number
  id: number
  title: string
}

export type PaginationParams = { page: number; limit: number }

export const getAlbums = async ({
  pagination,
  filter,
}: {
  pagination?: PaginationParams
  filter?: { albumId: number | string }
}): Promise<{ albums: Album[]; totalCount: number }> => {
  const params: { _page: number; _limit: number; id?: number | string } = {
    _page: 1,
    _limit: 5,
  }

  if (pagination) {
    params._limit = pagination.limit || params._limit
    params._page = pagination.page || params._page
  }

  if (filter) {
    params.id = filter.albumId
  }

  const { data, headers, config } = await api.get<Album[]>(URLS.albums, {
    params: params,
  })

  const totalCount = parseInt(headers[HEADER_TOTAL_ELEMENTS_COUNT]) || 0

  if (!headers[HEADER_TOTAL_ELEMENTS_COUNT]) {
    console.error(
      `${config.url} API changed. No anymore total count of records in headers`
    )
  }

  return { albums: data, totalCount: totalCount }
}

export type Photo = {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export const getPhotos = async ({
  albumId,
  pagination,
}: {
  albumId: number | string
  pagination: PaginationParams
}): Promise<{ photos: Photo[]; totalCount: number }> => {
  const { data, headers, config } = await api.get<Photo[]>(
    URLS.albumPhotos(albumId),
    {
      params: {
        _page: pagination.page,
        _limit: pagination.limit,
      },
    }
  )

  const totalCount = parseInt(headers[HEADER_TOTAL_ELEMENTS_COUNT]) || 0

  if (!headers[HEADER_TOTAL_ELEMENTS_COUNT]) {
    console.error(
      `${config.url} API changed. No anymore total count of records in headers`
    )
  }

  return { photos: data, totalCount }
}
