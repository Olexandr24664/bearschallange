import { Link } from 'react-router-dom'
import { GiBearFace } from 'react-icons/gi'

function Header(): JSX.Element {
  return (
    <header className="w-full flex items-center justify-center p-3">
      <div className="font-bold">
        <Link to="/">
          Bears <GiBearFace className="inline-block w-5 h-5" />
        </Link>
      </div>
    </header>
  )
}

export default Header
