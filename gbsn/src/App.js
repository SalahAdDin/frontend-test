import React, {useState, useEffect} from 'react';
import SearchBox from './components/SearchBox';
import FilterBox from './components/FiltersBox';
import MentionedSocialPostList from './components/MentionedSocialPostList';

function App() {
  
  const [query, saveQuery] = useState('');
  const [mentionedSocialPost, saveMentionedSocialPost] = useState([]);

  useEffect(() => {

    const queryAPI = async () => {

      let brand = '';

      if (query === '') return;
      if (query === 'me') brand = 'Z2EfoOUFQJVs39lg';
      const postPerPage = 4;
      const base_url=`https://adcaller.com/`;
      const brands_url=`${base_url}brands/`;
      const includes=`social%2Cmentions.brand`

      const url=`${brands_url}${brand}/mentioned_social_posts?limit=${postPerPage}&includes=${includes}`

      const answer = await fetch(url);
      const result = await answer.json();

      saveMentionedSocialPost(result.data.attributes);

      // console.log('====================================');
      // console.log(result);
      // console.log('====================================');
      /* https://adcaller.com/brands/Z2EfoOUFQJVs39lg/mentioned_social_posts?limit=4&includes=social%2Cmentions.brand*/
    }
    queryAPI();
  }, [query]);

  return (
    <div className="App brand-prestigio">
      <div className="container-fluid prestigio-brand-background">
        <div className="row pr-close-row">
          <div className="col col-lg-6 offset-lg-3">
            <div className="row no-gutters">
              <div className="col col-10 col-lg-10 col-md-8 col-sm-8 offset-1 offset-lg-1 offset-md-2 offset-sm-2 prestigio-white-stripe prestigio-shadow">               
                <SearchBox saveQuery={saveQuery}/>
                <FilterBox />
                <div className="prestigio-tab-pane" style={{display: `block`}} id="brand-pane" data-tabs="mentions">
								  <div className="prestigio-offset-pane-big">
									  <div className="row pr-responsive-row">
                      <MentionedSocialPostList mentionedSocialPost={mentionedSocialPost}/>
                    </div>
                  </div>
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
