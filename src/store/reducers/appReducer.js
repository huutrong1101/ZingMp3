import actionTypes from "../actions/actionTypes";

const initState = {
  banner: [],
  chill: {},
  friday: {},
  newEveryDay: {},
  top100: {},
  hotAlbum: {},
  xone: {},
  isLoading: false,
  newRelease: {},
  weekChart: [],
  chart: {},
  rank: [],
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionId === "hSlider")
            ?.items || null,
        chill:
          action.homeData?.find((item) => item.sectionId === "hArtistTheme") ||
          {},
        friday:
          action.homeData?.find((item) => item.sectionId === "hArtistTheme1") ||
          {},
        newEveryDay:
          action.homeData?.find((item) => item.sectionId === "hArtistTheme2") ||
          {},
        top100:
          action.homeData?.find((item) => item.sectionId === "h100") || {},
        xone: action.homeData?.find((item) => item.sectionId === "hXone") || {},
        hotAlbum:
          action.homeData?.find((item) => item.sectionId === "hAlbum") || {},
        newRelease:
          action.homeData?.find((item) => item.sectionType === "new-release") ||
          {},
        weekChart:
          action.homeData?.find((item) => item.sectionType === "weekChart")
            ?.items || [],
        chart:
          action.homeData?.find((item) => item.sectionId === "hZC")?.chart ||
          {},
        rank:
          action.homeData?.find((item) => item.sectionId === "hZC")?.items ||
          [],
      };

    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };

    default:
      return state;
  }
};

export default appReducer;
