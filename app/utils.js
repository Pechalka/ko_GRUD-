function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}

$.put = function(url, data, success){
	$.ajax({
		url : url,
		type : 'PUT',
		data : data,
		success : success
	})
}

$.delete = function(url, success){
	$.ajax({
		url : url,
		type : 'DELETE',
		success : success
	})
}

var render = function(region, ViewModel, model){
	if (model && (typeof model == 'string' || model instanceof String)) { //if model string use it as url for feach data from server
		$.get(model, function(data){
			var vm = new ViewModel(data);
			region(vm)
		})
		
	} else { //else use model as object adn sent it in view
		var vm = new ViewModel(model);
		region(vm)
	}
}