import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./Layout/DefaultLayout"
import PlayerList from "./Pages/PlayerList"
import Comparator from "./Pages/Comparator"
import GlobalProvider from './Context/GlobalContext'
import DetailPlayer from './Pages/DetailPlayer'
function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={DefaultLayout}>
            <Route path="/" Component={PlayerList}></Route>
            <Route path="/compare" Component={Comparator}></Route>
            <Route path="/details/:id" Component={DetailPlayer}> </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
