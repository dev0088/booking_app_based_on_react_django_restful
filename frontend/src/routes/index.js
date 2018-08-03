import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Templates
import TemplateSidebar from '../components/templateSidebar';
import TemplateTopbar from '../components/templateTopbar';

// Routes
import HomeScreen from '../containers/homeScreen';
import UsersScreen from '../containers/usersScreen';
import BookingScreen from '../containers/bookingScreen';
import Error from '../components/error';
// import SubFaq from "../containers/subFaq";
// import Faq from "../containers/faq";
// import Terms from "../containers/terms";
import ContactUs from "../containers/contactUs";

const Index = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={props => (
        <TemplateTopbar>
          <HomeScreen {...props} />
        </TemplateTopbar>
      )}
    />
    <Route
      path="/home"
      render={props => (
        <TemplateTopbar>
          <HomeScreen {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/book_online"
      render={props => (
        <TemplateTopbar>
          <UsersScreen {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/book_by_user"
      render={props => (
        <TemplateTopbar>
          <BookingScreen {...props} />
        </TemplateTopbar>
      )}
    />
    
    <Route
      path="/contact-us"
      render={props => (
        <TemplateTopbar>
          <ContactUs {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      render={props => (
        <TemplateSidebar>
          <Error {...props} title="404" content="Sorry, the route you requested does not exist" />
        </TemplateSidebar>
      )}
    />

  </Switch>
);

export default Index;
