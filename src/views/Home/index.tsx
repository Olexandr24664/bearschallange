import { Link } from 'react-router-dom'
import { GiBearFace } from 'react-icons/gi'

function Home(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <h4 className="font-bold text-lg">
          Welcome to bears <GiBearFace className="inline-block w-10 h-10" />
        </h4>
        <Link className="mt-2 p-2 text-blue-400 hover:underline" to="/albums">
          Start
        </Link>
      </div>
    </div>
  )
}

export default Home
