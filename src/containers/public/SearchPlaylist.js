import React, { useEffect, useState } from "react";
import { apiGetArtist } from "../../apis";
import { useSelector } from "react-redux";
import { SectionItem } from "../../components";

const SearchPlaylist = () => {
  const { searchData } = useSelector((state) => state.music);

  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await apiGetArtist(searchData?.top?.alias);
      if (response?.data?.err === 0) {
        setPlaylist(response.data.data.sections[1]);
      }
    };
    fetch();
  }, [searchData]);
  return (
    <div className="flex flex-col w-full gap-8 px-[46px]">
      <h3>Playlist/Album</h3>
      <div className="flex flex-wrap items-start justify-start">
        {playlist &&
          playlist?.items?.map((item) => (
            <SectionItem key={item.encodeId} item={item} data={playlist} />
          ))}
      </div>
    </div>
  );
};

export default SearchPlaylist;
