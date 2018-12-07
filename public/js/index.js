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
            socket.on('disconnect', function() {
                console.log('Server Disconnected...!!!');
            });

            jQuery('#messege-form').on('submit', function(e) {
                e.preventDefault();
                socket.emit('createMessege', {
                    from: 'User',
                    text: jQuery('[name=messege]').val()
                }, function() {
                    
                });
            })