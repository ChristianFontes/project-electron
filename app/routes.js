import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import LoginPage from './containers/LoginPage';
import LoggedInPage from './containers/LoggedInPage';
import AddMember from './containers/AddMember';
import ListMember from './containers/ListMember';
import ListGestor from './containers/ListGestor';
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
import MyListTicket from './containers/MyListTicket';
import AddSede from './containers/AddSede';
import AddNewDepartament from './containers/AddNewDepartament';
import AddProvider from './containers/AddProvider';
import ListSede from './containers/ListSede';
import ListProvider from './containers/ListProvider';
import ListDepartament from './containers/ListDepartament';
import EditSPD from './containers/EditSPD';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="loggedin" component={LoggedInPage} />
    <Route path="addmember" component={AddMember} />
    <Route path="listmember" component={ListMember} />
    <Route path="listgestor" component={ListGestor} />
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
    <Route path="mylistticket" component={MyListTicket} />
    <Route path="addsede" component={AddSede} />
    <Route path="addnewdepartament" component={AddNewDepartament} />
    <Route path="addprovider" component={AddProvider} />
    <Route path="listsede" component={ListSede} />
    <Route path="listprovider" component={ListProvider} />
    <Route path="listdepartament" component={ListDepartament} />
    <Route path="editspd" component={EditSPD} />
  </Route>
);
