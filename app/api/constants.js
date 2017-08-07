let url = 'http://127.0.0.1:1337/';
export const login = url + 'login';
export const register = url + 'user';
export const departament = url + 'departament';
export const sede = url + 'sede';
export const ticket = url + 'ticket';
export const provider = url + 'provider';
export const product = url + 'product';
export const inventory = url + 'inventory';
export const incidence = url + 'incidence';
export const records = url + 'records';
export const listSerialProduct = url + 'serialproduct';
export const listNameProduct = url + 'groupbynameproduct';
export const listModelProduct = url + 'groupbymodelproduct';
export const listBrandProduct = url + 'groupbybrandproduct';
export const listInventories = url + 'listinventories';
export const user = url + 'user';
export const ticketIncidence = url + 'ticketincidence';


var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
export var io = sailsIOClient(socketIOClient);
io.sails.url = 'http://127.0.0.1:1337';
