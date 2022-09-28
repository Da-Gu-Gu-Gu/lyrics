import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { useGetSongByGenreQuery } from '../redux/services/shazamCore';
import { selectGenreListId } from '../redux/features/playerSlice';

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongByGenreQuery(genreListId || 'POP');

  if (isFetching) return <Loader title="loading songs..." />;
  if (error) return <Error />;
  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
  return (
    <div className="flex flex-col">

      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover</h2>
        <select
          onChange={(e) => { dispatch(selectGenreListId(e.target.value)); }}
          value={genreListId || 'POP'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {
            genres.map((x) => (
              <option key={x.value} value={x.value}>{x.title}</option>
            ))
        }
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((x, i) => (
          <SongCard
            key={x.key}
            song={x}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
