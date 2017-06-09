import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import LoginPage from './containers/LoginPage';
import LoggedInPage from './containers/LoggedInPage';
import AddMember from './containers/AddMember';
import ListMember from './containers/ListMember';
import EditMember from './containers/EditMember';
import AddTicket from './containers/AddTicket';
import ListTicket from './containers/ListTicket';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="loggedin" component={LoggedInPage} />
    <Route path="addmember" component={AddMember} />
    <Route path="listmember" component={ListMember} />
    <Route path="editmember" component={EditMember} />
    <Route path="addticket" component={AddTicket} />
    <Route path="listticket" component={ListTicket} />
  </Route>
);
