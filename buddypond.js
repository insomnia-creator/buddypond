let buddypond = {}

buddypond.endpoint = 'http://buddypond.com:8080/api/v3';

buddypond.authBuddy = function authBuddy (me, password, cb) {
  console.log(me, password)
  apiRequest('/auth', 'POST', {
    buddyname: me,
    buddypassword: password
  }, function(err, data){
    buddypond.me = me;
    cb(err, data);
  })
}

buddypond.addBuddy = function addBuddy (buddyname, cb) {
  apiRequest('/buddies/' + buddyname + '/addbuddy', 'POST', {
    buddyname: buddyname
  }, function(err, data){
    cb(err, data);
  })
}

buddypond.removeBuddy = function addBuddy (buddyname, cb) {
  apiRequest('/buddies/' + buddyname + '/remove', 'POST', {
    buddyname: buddyname
  }, function(err, data){
    cb(err, data);
  })
}

buddypond.approveBuddy = function approveBuddy (buddyname, cb) {
  apiRequest('/buddies/' + buddyname + '/approve', 'POST', {
    buddyname: buddyname
  }, function(err, data){
    cb(err, data);
  })
}

buddypond.denyBuddy = function denyBuddy (buddyname, cb) {
  apiRequest('/buddies/' + buddyname + '/deny', 'POST', {
    buddyname: buddyname
  }, function(err, data){
    cb(err, data);
  })
}

buddypond.getBuddyList = function getBuddyList (cb) {
  apiRequest('/buddies', 'POST', {}, function(err, data){
    cb(err, data);
  })
}

buddypond.sendMessage = function sendMessage (buddyname, buddytext, cb) {
  apiRequest('/buddies/' + buddyname + '/message', 'POST', {
    buddyname: buddyname,
    buddytext: buddytext
  }, function(err, data){
    cb(err, data);
  })
}

buddypond.getMessages = function getMessages (buddyname, cb) {
  apiRequest('/buddies/' + buddyname + '/message', 'GET', {
  }, function(err, data){
    cb(err, data);
  })
}

function apiRequest (uri, method, data, cb) {
  let url = buddypond.endpoint + uri;
  let headers = {
     "accept": "application/json"
  };

  if (buddypond.qtokenid) {
    data.qtokenid = buddypond.qtokenid
  }

  $.ajax({
    beforeSend: function (jqXHR, settings) {
      if (buddypond.qtokenid) {
        //jqXHR.setRequestHeader('qtokenid', buddypond.qtokenid);
      }
      //jqXHR.setRequestHeader('Access-Control-Allow-Origin', 'http://buddypond.com');
    },
    "headers": {
       "accept": "application/json"
    },
    crossDomain: true,
    url: url,
    data: data,
    method: method,
    dataType: 'json',
    error: function (data, res){
      console.log('AJAX error', data, res);
      cb(new Error('ajax error'), data);
    },
    timeout: function(err, res){
      console.log('AJAX timeout');
      cb(err, res);
    },
    success: function (data){
      // console.log('got back', null, data)
      cb(null, data)
    }
  });
}


