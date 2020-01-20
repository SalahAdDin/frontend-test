import React, { useState, useEffect } from "react";
import SearchBox from "./components/SearchBox";
import FilterBox from "./components/FiltersBox";
import MentionedSocialPostList from "./components/MentionedSocialPostList";
import TopMentionersList from "./components/TopMentionersList";
import Error from "./components/Error";
import { sortBy } from "lodash";

function App() {
  const [query, saveQuery] = useState("");
  const [orderField, saveOrderField] = useState("post_created_at");
  const [fetchOrderField, saveFetchOrderField] = useState("post_created_at");
  const [option, saveOption] = useState("all");
  const [mentionedSocialPost, saveMentionedSocialPost] = useState([]);
  const [topMentioners, saveTopMentioners] = useState([]);
  const [currentPage, saveCurrentPage] = useState(1);
  const [totalPost, setTotalPost] = useState(0);
  const [error, saveError] = useState(false);

  useEffect(() => {
    saveTopMentioners([]);
    saveMentionedSocialPost([]);
    saveCurrentPage(1);
    queryAPI();
  }, [query]);

  useEffect(() => {
    if (currentPage > 1) {
      queryAPI();
    }
  }, [currentPage]);

  useEffect(() => {
    sortData();
  }, [orderField]);

  const sortData = () => {
    if (orderField !== fetchOrderField) {
      switch (orderField) {
        case "post_created_at":
          saveMentionedSocialPost(
            sortBy(mentionedSocialPost, [o => o.post_created_at])
          );
          break;
        case "usersid":
          saveMentionedSocialPost(
            sortBy(mentionedSocialPost, [o => o.user[0].userinfo.displayname])
          );
        default:
          break;
      }
    }
  };

  const queryAPI = async () => {
    let brand = "";
    const postPerPage = 4;
    const includes = `user,social,mentions.brand`;
    const sorting = `sortField=${orderField}&sortOrder=asc`;

    const baseURL = `https://adcaller.com/`;
    const brandURL = `${baseURL}brands`;
    // const userBaseURL = `${baseURL}users`
    const sidBrandURL = `${brandURL}?qField=brand_name&qValue=${encodeURIComponent(
      query
    )}`;
    //https://adcaller.com/brands?qField=brand_name&qValue=me

    saveFetchOrderField(orderField);

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

    const url = `${brandURL}/${brand}/mentioned_social_posts?page=${currentPage}&limit=${postPerPage}&${sorting}&includes=${encodeURIComponent(
      includes
    )}`;
    /* https://adcaller.com/brands/Z2EfoOUFQJVs39lg/mentioned_social_posts?sortField=userid&sortOrder=asc&page=2&limit=4&includes=social%2Cmentions.brand&*/

    const answer = await fetch(url);
    const result = await answer.json();

    // TODO:
    setTotalPost(result.meta.totalResults);

    let topMentionerList = result.data.attributes.reduce((r, a) => {
      r[a.usersid] = [...(r[a.usersid] || []), a];
      r[a.usersid]["name"] = a.user[0].userinfo.displayname;
      r[a.usersid]["key"] = a.usersid;
      r[a.usersid]["picture"] = a.user[0].userinfo.avatar_url;
      // TODO: just add increase a counter and add the name and photo url

      return r;
    }, {});

    saveError(false);
    saveMentionedSocialPost(m => [...m, ...result.data.attributes]);
    saveTopMentioners(
      Object.values(topMentionerList).sort((a, b) => b.length - a.length)
    );
  };

  const filteredPosts = () => {
    if (option === "all") {
      return mentionedSocialPost;
    }
    return mentionedSocialPost.filter(post => post.social === option);
  };

  return (
    <div className="App brand-prestigio">
      <div className="container-fluid prestigio-brand-background">
        <div className="row pr-close-row">
          <div className="col col-lg-6 offset-lg-3">
            <div className="row no-gutters">
              <div className="col col-10 col-lg-10 col-md-8 col-sm-8 offset-1 offset-lg-1 offset-md-2 offset-sm-2 prestigio-white-stripe prestigio-shadow">
                <SearchBox
                  saveQuery={saveQuery}
                  saveOrderField={saveOrderField}
                />
                <FilterBox saveOption={saveOption} option={option} />
                <div
                  className="prestigio-tab-pane"
                  style={{ display: `block` }}
                  id="brand-pane"
                  data-tabs="mentions"
                >
                  <div className="prestigio-offset-pane-big">
                    <div className="row pr-responsive-row">
                      <MentionedSocialPostList
                        mentionedSocialPost={filteredPosts()}
                        saveCurrentPage={saveCurrentPage}
                        currentPage={currentPage}
                        totalPost={totalPost}
                      />
                      <TopMentionersList topMentioners={topMentioners} />
                    </div>
                  </div>
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