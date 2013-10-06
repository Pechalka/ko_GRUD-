var users = [
	{ id : guid(), name : 'vasa'},
	{ id : guid(), name : 'peta'},
	{ id : guid(), name : 'ola'}
];

$.mockjax({
    url:  '/users',
    type : 'GET',
    responseText: users
});

$.mockjax({
    url:  '/users',
    type : 'POST',
    response: function(r) {
    	r.data.id = guid();
    	users.push(r.data)
    }
});


$.mockjax({ // DELETE /user/1
  url: /^\/users\/(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})/,
  urlParams: ['id'],
  type : 'DELETE',
  response: function (r) {
  	var id = r.urlParams.id;
	var index = -1;  	
	for (var i = 0; i < users.length; i++) {
		if (users[i].id == id)
			index = i;
	}
	if (index!=-1)	users.splice(index, 1);
  }
});

$.mockjax({ // GET /user/1
  url: /^\/users\/(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})/,
  urlParams: ['id'],
  type : 'GET',
  response: function (r) {
  	var id = r.urlParams.id;
	var user;  	
	for (var i = 0; i < users.length; i++) {
		if (users[i].id == id){
			user = users[i];
			break;
		}
	}
	this.responseText = user;
  }
});

$.mockjax({ // PUT /user/1 { name : 'vasa'}
	url: /^\/users\/(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})/,
	urlParams: ['id'],
    type : 'PUT',
    response: function(r) {
    	var id = r.urlParams.id;
    	for (var i = 0; i < users.length; i++) {
    		if (users[i].id == id)
    			users[i].name = r.data.name;
    	};
    }
});