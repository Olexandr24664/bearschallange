import { Link } from 'react-router-dom'
import { Album } from '../../../../api'
import { IoIosAlbums } from 'react-icons/io'

type ItemProps = {
  album: Album
}

function Item({ album }: ItemProps): JSX.Element {
  return (
    <Link
      to={`/albums/${album.id}`}
      className="flex flex-col items-center justify-center italic p-4 text-center hover:bg-gray-100 hover:underline  cursor-pointer "
    >
      <IoIosAlbums className="mb-1" />
      {album.title}
    </Link>
  )
}

export default Item
