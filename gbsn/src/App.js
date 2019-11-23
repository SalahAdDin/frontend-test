import React, { useState, useEffect } from "react";
import useInfiniteScroll from "./components/useInfiniteScroll";
import SearchBox from "./components/SearchBox";
import FilterBox from "./components/FiltersBox";
import MentionedSocialPostList from "./components/MentionedSocialPostList";
import TopMentionersList from "./components/TopMentionersList";
import Error from "./components/Error";

function App() {
  const [query, saveQuery] = useState("");
  const [mentionedSocialPost, saveMentionedSocialPost] = useState([]);
  const [topMentioners, saveTopMentioners] = useState([]);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [currentPage, saveCurrentPage] = useState(1);
  const [error, saveError] = useState(false);
  // const [totalPages, saveTotalPages] = useState(1);

  function fetchMoreListItems() {
    saveCurrentPage(currentPage + 1);
    setIsFetching(false);

  useEffect(() => {
    saveTopMentioners([]);
    saveMentionedSocialPost([]);
    saveCurrentPage(1);
    setPostsLoaded(false);
    queryAPI();
  }, [query]);

  useEffect(() => {
    if (currentPage > 1) {
      queryAPI();
    }
  }, [currentPage]);

  const queryAPI = async () => {
    let brand = "";
    const postPerPage = 4;
    const includes = `user%2Csocial%2Cmentions.brand`;

    const baseURL = `https://adcaller.com/`;
    const brandURL = `${baseURL}brands`;
    // const userBaseURL = `${baseURL}users`
    const sidBrandURL = `${brandURL}?qField=brand_name&qValue=${query}`;
    //https://adcaller.com/brands?qField=brand_name&qValue=me

    if (query === "") return;
    else if (query === "me") brand = "Z2EfoOUFQJVs39lg";
    else {
      // Getting the sidbrand in order to get the brand
      // TODO: Improve the brand searching method. but it depends on the API.
      const searchBrand = await fetch(sidBrandURL);
      const searchBrandResult = await searchBrand.json();

      if (searchBrandResult.data.attributes[0])
        brand = searchBrandResult.data.attributes[0].sidbrand;
      else {
        saveError(true);
        return;
      }
      // if it cannot get the result, raise an error
    }

    const url = `${brandURL}/${brand}/mentioned_social_posts?limit=${postPerPage}&includes=${includes}&page=${currentPage}`;
    /* https://adcaller.com/brands/Z2EfoOUFQJVs39lg/mentioned_social_posts?page=2&limit=4&includes=social%2Cmentions.brand*/
    const answer = await fetch(url);
    const result = await answer.json();

    // TODO: Get top mentioner list
    let topMentionerList = result.data.attributes.reduce((r, a) => {
      r[a.usersid] = [...(r[a.usersid] || []), a];
      r[a.usersid]["name"] = a.user[0].userinfo.displayname;
      r[a.usersid]["key"] = a.usersid;
      r[a.usersid]["picture"] = a.user[0].userinfo.avatar_url;
      // TODO: just add increase a counter and add the name and photo url
      return r;
    }, {});
    // TODO: sort in descendent order

    if (!result.data.attributes.length) {
      setPostsLoaded(true);
    }

    saveError(false);
    setIsFetching(false);
    saveMentionedSocialPost(m => [...m, ...result.data.attributes]);
    saveTopMentioners(Object.values(topMentionerList));
  };

  }, [query, currentPage]);

  return (
    <div className="App brand-prestigio">
      <div className="container-fluid prestigio-brand-background">
        <div className="row pr-close-row">
          <div className="col col-lg-6 offset-lg-3">
            <div className="row no-gutters">
              <div className="col col-10 col-lg-10 col-md-8 col-sm-8 offset-1 offset-lg-1 offset-md-2 offset-sm-2 prestigio-white-stripe prestigio-shadow">
                <SearchBox saveQuery={saveQuery} />
                <FilterBox saveMentionedSocialPost={saveMentionedSocialPost} />
                <div
                  className="prestigio-tab-pane"
                  style={{ display: `block` }}
                  id="brand-pane"
                  data-tabs="mentions"
                >
                  <div className="prestigio-offset-pane-big">
                    <div className="row pr-responsive-row">
                      <MentionedSocialPostList
                        mentionedSocialPost={mentionedSocialPost}
                      />
                      <TopMentionersList topMentioners={topMentioners} />
                    </div>
                  </div>
                  {isFetching && "Fetching more list items..."}
                </div>
                {error ? (
                  <Error message="No brand was matched with your query!" />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
