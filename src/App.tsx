import loadable from '@loadable/component'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const HomeView = loadable(() => import('./views/Home'))
const AlbumsView = loadable(() => import('./views/Albums'))
const AlbumPhotosView = loadable(() => import('./views/AlbumPhotos'))

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/albums/:albumId">
          <AlbumPhotosView />
        </Route>
        <Route path="/albums">
          <AlbumsView />
        </Route>
        <Route path="/">
          <HomeView />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
