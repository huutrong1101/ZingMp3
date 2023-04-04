import {
  Home,
  Public,
  Login,
  Personal,
  Album,
  WeekRank,
  ZingChart,
  Search,
  SearchSongs,
  SearchAll,
  Singer,
  SearchPlaylist,
} from "./containers/public";
import { Routes, Route } from "react-router-dom";
import path from "./ultis/path";
import { useEffect } from "react";
import * as actions from "./store/actions";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getHome());
  }, []);

  return (
    <>
      <div>
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.MY__MUSIC} element={<Personal />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={path.PLAYLIST_TITLE_PID} element={<Album />} />
            <Route path={path.WEEKRANK_TITLE_PID} element={<WeekRank />} />
            <Route path={path.ZING_CHART} element={<ZingChart />} />
            <Route path={path.SEARCH} element={<Search />}>
              <Route path={path.ALL} element={<SearchAll />} />
              <Route path={path.SONG} element={<SearchSongs />} />
              <Route path={path.PLAYLIST_SEARCH} element={<SearchPlaylist />} />
            </Route>
            <Route path={path.HOME__SINGER} element={<Singer />} />
            <Route path={path.HOME__ARTIST__SINGER} element={<Singer />} />

            <Route path={path.STAR} element={<Home />} />
          </Route>
        </Routes>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
