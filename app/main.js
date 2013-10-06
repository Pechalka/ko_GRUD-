var List = function(users){
	var self = this;
	self.users = ko.observableArray(users);

	self.deleteClick = function(user){
		$.delete('/users/'+ user.id, function(){
			self.users.remove(user);
		})
	}

	self.templateName = 'user-list';
}

var Details = function(user){
	var self = this;

	self.name = ko.observable(user.name);

	self.saveClick = function(){
		if (user.id) {
			$.put('/users/' + user.id, { name : self.name() }, app.showList);
		} else {
			$.post('/users', { name : self.name() }, app.showList);
		}		
	}

	self.buttonText = user.id ? 'update' : 'create' ;

	self.templateName = 'user-details';
}

var app = {
	content : ko.observable(null),
	showList : function(){
		render(app.content, List, '/users');
	}, 
	showDetails : function(u){
		if (u.id){
			render(app.content, Details, '/users/' + u.id);
		} else {
			render(app.content, Details, { name : ''});
		}	
	} 
};


$(function(){
	ko.applyBindings(app);
	app.showList();
});