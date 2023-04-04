import actionTypes from "../actions/actionTypes";

const initState = {
  banner: null,
  actists: null,
  chill: null,
  focus: null,
  friday: null,
  newEveryDay: null,
  top100: null,
  hotAlbum: null,
  xone: null,
  isLoading: false,
  newRelease: null,
  weekChart: null,
  chart: null,
  rank: null,
  singers: null,
  scrollTop: true,
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionId === "hSlider")
            ?.items || null,
        actists:
          action.homeData?.find((item) => item.sectionId === "hArtistTheme") ||
          null,
        chill:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme") ||
          null,
        focus:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme2") ||
          null,
        friday:
          action.homeData?.find((item) => item.sectionId === "hArtistTheme1") ||
          null,
        newEveryDay:
          action.homeData?.find((item) => item.sectionId === "hArtistTheme2") ||
          null,
        top100:
          action.homeData?.find((item) => item.sectionId === "h100") || null,
        xone:
          action.homeData?.find((item) => item.sectionId === "hXone") || null,
        hotAlbum:
          action.homeData?.find((item) => item.sectionId === "hAlbum") || null,
        newRelease:
          action.homeData?.find((item) => item.sectionType === "new-release") ||
          null,
        weekChart:
          action.homeData?.find((item) => item.sectionType === "weekChart")
            ?.items || null,
        chart:
          action.homeData?.find((item) => item.sectionId === "hZC")?.chart ||
          null,
        rank:
          action.homeData?.find((item) => item.sectionId === "hZC")?.items ||
          null,
        singers:
          action.homeData?.find(
            (item) => item.sectionType === "artistSpotlight"
          )?.items || null,
      };

    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };

    case actionTypes.ZERO_SCROLLTOP:
      return {
        ...state,
        scrollTop: action.flag,
      };

    default:
      return state;
  }
};

export default appReducer;
