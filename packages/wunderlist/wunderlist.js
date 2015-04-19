Wunderlist = {};

Wunderlist.getToken = function(){
    if(!Meteor.settings.wunderlist_client_id)
        throw new Meteor.Error(500, 'Please provide a Client ID token in Meteor.settings');
    var client_id = Meteor.settings.public.wunderlist.wunderlist_client_id;
    var redirect_url = Meteor.settings.public.wunderlist.wunderlist_redirect_url;
    var shortenResponse = Meteor.http.get(
        "https://www.wunderlist.com/oauth/authorize?client_id=" + client_id + "&redirect_uri=" + redirect_url + "&state=RANDOM"
    );
    if(shortenResponse.statusCode === 200){
        return shortenResponse.data.data.url
    }else{
        throw new Meteor.Error(500, "Wunderlist call failed with error: "+shortenResponse.status_txt);
    }
}