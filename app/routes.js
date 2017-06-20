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
import AddProduct from './containers/AddProduct';
import ListProduct from './containers/ListProduct';
import EditProduct from './containers/EditProduct';
import AddInventory from './containers/AddInventory';
import ListInventory from './containers/ListInventory';
import EditInventory from './containers/EditInventory';
import AddIncidence from './containers/AddIncidence';
import ListIncidence from './containers/ListIncidence';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="loggedin" component={LoggedInPage} />
    <Route path="addmember" component={AddMember} />
    <Route path="listmember" component={ListMember} />
    <Route path="editmember" component={EditMember} />
    <Route path="addticket" component={AddTicket} />
    <Route path="listticket" component={ListTicket} />
    <Route path="addproduct" component={AddProduct} />
    <Route path="listproduct" component={ListProduct} />
    <Route path="editproduct" component={EditProduct} />
    <Route path="addinventory" component={AddInventory} />
    <Route path="listinventory" component={ListInventory} />
    <Route path="editinventory" component={EditInventory} />
    <Route path="addincidence" component={AddIncidence} />
    <Route path="listincidence" component={ListIncidence} />
  </Route>
);
