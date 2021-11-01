import { Album } from '../../../api'
import Item from './Item'

type AlbumListProps = {
  // children: React.ReactNode
  albums: Album[]
}

function AlbumList({ albums }: AlbumListProps): JSX.Element {
  const renderListItems = (): JSX.Element | JSX.Element[] => {
    if (albums.length < 1) {
      return <div>No albums.</div>
    }

    return albums.map((album) => {
      return <Item key={album.id.toString()} album={album} />
    })
  }

  return (
    <div className="grid gap-2 xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {renderListItems()}
    </div>
  )
}

export default AlbumList
