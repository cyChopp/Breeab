import React from 'react';
import SearchIcon from "@material-ui/icons/Search"
import { TwitterTimelineEmbed,TwitterShareButton,TwitterTweetEmbed} from 'react-twitter-embed';

const Widgets=()=>{
    return (
        <div className="widgets">
            <div className="widgets--input">
                <SearchIcon className="widgets--searchIcon"/>
                <input placeholder="Search" type="text"/>
            </div>
            {/* <div className="widgets--widgetContaienr">
                <TwitterTweetEmbed className="r-14lw9ot" tweetId="1329785897752145921" options={{height:250}} />
                <TwitterTimelineEmbed sourceType="profile" screenName="dan_abramov" options={{height:350}}/>
                <TwitterShareButton url={"https://www.facebook.com/Louttchenko/"} options={{text:"#ReactJS" ,via:'louttchenko'}} />
            </div> */}
        </div>
    )
}

export default Widgets
