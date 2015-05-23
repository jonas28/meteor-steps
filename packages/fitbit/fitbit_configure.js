Template.configureLoginServiceDialogForFitbit.siteUrl = function () {
	//TODO: Verify whether Fitbit can recognize localhost as a domain name
	return Meteor.absoluteUrl({replaceLocalhost: true});
};

Template.configureLoginServiceDialogForFitbit.fields = function () {
	return [
		//TODO: Fill in the labels field
		{property: 'consumerKey', label: 'consumer_key'},
		{property: 'secret', label: 'consumer_secret'}
	];
};
