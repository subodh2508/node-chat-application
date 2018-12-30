var socket = io();
            socket.on('connect', function() {
                console.log('Connected to server...!!!');
            });
            
            socket.on('newMessege', function(messege) {
                console.log('messege: ', messege);
                var li = jQuery('<li></li>');
                li.text(`${messege.from}: ${messege.text}`);

                jQuery('#messeges').append(li);
            });
            socket.on('newLocationMessege', function(messege) {
                console.log('messege: ', messege);
                var li = jQuery('<li></li>');
                var a = jQuery('<a target="_blank">My current location</a>');
                li.text(`${messege.from}:  `);
                a.attr('href', messege.url);
                li.append(a);
                jQuery('#messeges').append(li);
            });
            socket.on('disconnect', function() {
                console.log('Server Disconnected...!!!');
            });

            jQuery('#messege-form').on('submit', function(e) {
                e.preventDefault();
                socket.emit('createMessege', {
                    from: 'User',
                    text: jQuery('[name=messege]').val()
                }, function(data) {
                    console.log('got it: ', data);
                });
            });


            var locationButton = jQuery('#send-location');
            locationButton.on('click', function(){
                if(!navigator.geolocation){
                    return alert('Geolocation not supported by your browser');
                }
                navigator.geolocation.getCurrentPosition(function(position){
                    console.log('position', position);
                    socket.emit('createLocationMessege', {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }, function(data){
                        console.log('got msg: ', data);
                    });
                }, function() {
                    alert('Unable to fetch location');
                });
            })