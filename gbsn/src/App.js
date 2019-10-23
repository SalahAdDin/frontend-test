import React, { useState, useEffect } from "react";
import useInfiniteScroll from "./components/useInfiniteScroll";
import SearchBox from "./components/SearchBox";
import FilterBox from "./components/FiltersBox";
import MentionedSocialPostList from "./components/MentionedSocialPostList";


function App() {
  const [query, saveQuery] = useState("");
  const [mentionedSocialPost, saveMentionedSocialPost] = useState([]);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [currentPage, saveCurrentPage] = useState(1);
  // const [totalPages, saveTotalPages] = useState(1);

  function fetchMoreListItems() {
      saveCurrentPage(currentPage+1);
      setIsFetching(false);

      console.log('====================================');
      console.log(currentPage);
      console.log('====================================');
  }

  useEffect(() => {
    const queryAPI = async () => {
      
      let brand = "";
      const postPerPage = 4;
      const includes = `social%2Cmentions.brand`;

      const baseURL = `https://adcaller.com/`;
      const brandURL = `${baseURL}brands`;
      const sidBrandURL = `${brandURL}?qField=brand_name&qValue=${query}`;
      //https://adcaller.com/brands?qField=brand_name&qValue=me
      
      if (query === "") return;
      else if (query === "me") brand = "Z2EfoOUFQJVs39lg";
      else {
        // Getting the sidbrand in order to get the brand
        const searchBrand = await fetch(sidBrandURL);
        const searchBrandResult = await searchBrand.json();

        brand = searchBrandResult.data.attributes[0].sidbrand;
      }

      const url = `${brandURL}/${brand}/mentioned_social_posts?limit=${postPerPage}&includes=${includes}&page=${currentPage}`;
      /* https://adcaller.com/brands/Z2EfoOUFQJVs39lg/mentioned_social_posts?page=2&limit=4&includes=social%2Cmentions.brand*/

      const answer = await fetch(url);
      const result = await answer.json();

      saveMentionedSocialPost(result.data.attributes);

      // Calculate total pages
      // const calculateTotalPages = Math.ceil(
      //   result.meta.totalResults / postPerPage
      // );
      // saveTotalPages(calculateTotalPages);

      // console.log("====================================");
      // console.log(result);
      // console.log("====================================");
      
    };
    queryAPI();
  }, [query, currentPage]);

  return (
    <div className="App brand-prestigio">
      <div className="container-fluid prestigio-brand-background">
        <div className="row pr-close-row">
          <div className="col col-lg-6 offset-lg-3">
            <div className="row no-gutters">
              <div className="col col-10 col-lg-10 col-md-8 col-sm-8 offset-1 offset-lg-1 offset-md-2 offset-sm-2 prestigio-white-stripe prestigio-shadow">
                <SearchBox saveQuery={saveQuery} />
                <FilterBox saveMentionedSocialPost={saveMentionedSocialPost}/>
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
                    </div>
                  </div>
                  {isFetching && 'Fetching more list items...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
