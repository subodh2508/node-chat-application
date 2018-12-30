var socket = io();

function ScrollToBottom() {
    var messeges = jQuery('#messeges');
    var newMessege = messeges.children('li:last-child');

    var clientHeight = messeges.prop('clientHeight');
    var scrollTop = messeges.prop('scrollTop');
    var scrollHeight = messeges.prop('scrollHeight');
    var newMessegeHeight = newMessege.innerHeight();
    var lastMessegeHeight = newMessege.prev().innerHeight();

    if( clientHeight + scrollTop + newMessegeHeight + lastMessegeHeight >= scrollHeight) {
        console.log('should scroll....');
        messeges.scrollTop(scrollHeight);
    }
}
            socket.on('connect', function() {
                console.log('Connected to server...!!!');
            });
            
            socket.on('newMessege', function(messege) {
                var template = jQuery('#messege-template').html();
                var formattedTime = moment(messege.createdAt).format('h:mm a');
                var html = Mustache.render(template, {
                    from: messege.from,
                    text: messege.text,
                    createdAt: formattedTime
                });
                jQuery('#messeges').append(html);
                ScrollToBottom();
                // console.log('messege: ', messege);
                // var formattedTime = moment(messege.createdAt).format('h:mm a');
                // var li = jQuery('<li></li>');
                // li.text(`${messege.from} ${formattedTime}: ${messege.text}`);

                // jQuery('#messeges').append(li);
            });
            socket.on('newLocationMessege', function(messege) {
                var template = jQuery('#location-messege-template').html();
                var formattedTime = moment(messege.createdAt).format('h:mm a');
                var html = Mustache.render(template, {
                    from: messege.from,
                    url: messege.url,
                    createdAt: formattedTime
                });
                jQuery('#messeges').append(html);
                ScrollToBottom();
                // var formattedTime = moment(messege.createdAt).format('h:mm a');
                // console.log('messege: ', messege);
                // var li = jQuery('<li></li>');
                // var a = jQuery('<a target="_blank">My current location</a>');
                // li.text(`${messege.from}  ${formattedTime}:  `);
                // a.attr('href', messege.url);
                // li.append(a);
                // jQuery('#messeges').append(li);
            });
            socket.on('disconnect', function() {
                console.log('Server Disconnected...!!!');
            });
            var messegeTextBox = jQuery('[name=messege]');
            jQuery('#messege-form').on('submit', function(e) {
                e.preventDefault();
                socket.emit('createMessege', {
                    from: 'User',
                    text: messegeTextBox.val()
                }, function() {
                    messegeTextBox.val('');
                });
            });


            var locationButton = jQuery('#send-location');
            locationButton.on('click', function(){
                if(!navigator.geolocation){
                    return alert('Geolocation not supported by your browser');
                }

                locationButton.attr('disabled', 'disabled').text('Sending location...');
                navigator.geolocation.getCurrentPosition(function(position){
                    console.log('position', position);
                    locationButton.removeAttr('disabled').text('Send location');
                    socket.emit('createLocationMessege', {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }, function(){
                    });
                }, function() {
                    locationButton.removeAttr('disabled').text('Send location');
                    alert('Unable to fetch location');
                });
            })