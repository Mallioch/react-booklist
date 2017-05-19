module.exports = {

  hasConnectSidCookie: function() {
    return document.cookie.indexOf('connect.sid=') > -1;
  },

  deleteSidCookie: function() {
    document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

};
