import HomeContainer from "./Home/HomeContainer";
import ProfileContainer from "./Profile/ProfileContainer";
import List from "./List/List";
import Messages from "./Messages/Messages";
import { Route, Switch } from "react-router-dom";
import SignUp from "../../Components/SignUp/SignUp";
import { signUpThunk } from "../../redux/authentication";
import { connect } from "react-redux";
import { compose } from "redux";
import IsAuthHoc from "../../hoc/IsAuthHoc";
import SignIn from "../../Components/SignIn/SignIn";
import ShowUser from "./ShowUser/ShowUser";

const Feed = (props) => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <HomeContainer mobile={props.mobile} />}/>
        <Route path="/profile" render={() => <ProfileContainer mobile={props.mobile} />} />
        <Route path="/chat" render={() => (
            <Messages
              fullname={props.fullname}
              image={props.image}
              mobile={props.mobile}
              
            />
          )}
        />

        <Route path="/list" render={() => <List mobile={props.mobile} />} />
        <Route path="/user" component={ShowUser} />

        <Route path="/signin" render={() => <SignIn isAuth={props.isAuth} mobile={props.mobile} />} />

        <Route path="/signup" render={() => (
            <SignUp isAuth={props.isAuth} signUpThunk={props.signUpThunk} />
          )}
        />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => ({
  image: state.profile.image,
  fullname: state.profile.fullname,
  isAuth: state.auth.isAuth,
});

export default compose(
  IsAuthHoc,
  connect(mapStateToProps, {
    signUpThunk,
  })
)(Feed);
