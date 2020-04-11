import React from 'react';

export const ClientIDHandlerContext = React.createContext({
    clientID: -1,
    getClientID: () => {},
    handleClientID: (clientID) => {},
    mercureListeners:{},
    handleMercureListener: (object, method, fun) => {},
    removeMercureListener: (object, method) => {},
});