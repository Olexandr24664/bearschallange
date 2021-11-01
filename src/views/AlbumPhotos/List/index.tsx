import { Photo } from '../../../api'
import Item from './Item'

type AlbumPhotoListProps = {
  // children: React.ReactNode
  photos: Photo[]
}

function AlbumPhotoList({ photos }: AlbumPhotoListProps): JSX.Element {
  const renderListItems = (): JSX.Element | JSX.Element[] => {
    if (photos.length < 1) {
      return <div>No photos.</div>
    }

    return photos.map((photo) => {
      return <Item key={photo.id.toString()} photo={photo} />
    })
  }

  return (
    <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {renderListItems()}
    </div>
  )
}

export default AlbumPhotoList
