import "./App.css";
import SidebarContainer from "./Sidebar/SidebarContainer";
import Feed from "./Feed/Feed";
import "./Widgets/Widgets.css";
import Widgets from "./Widgets/Widgets";
import { Fragment } from "react";

import Media from "react-media";

function App(props) {
  return (
    <div className="app">
      <SidebarContainer />
    {/* break points */}

      <Media
        queries={{
          small: "(max-width: 999px)",
          large: "(min-width: 1000px)",
        }}
      >
        {(matches) => (
          <Fragment>
            {matches.small && <Feed mobile={true} />}
            {matches.large && (
              <>
                <Feed  mobile={false}/>
                <Widgets/>
              </>)}
          </Fragment>
        )}
      </Media>
    </div>
  );
}

export default App;
