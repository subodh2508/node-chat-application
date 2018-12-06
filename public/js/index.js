var socket = io();
            socket.on('connect', function() {
                console.log('Connected to server...!!!');
                socket.emit('createEmail', {
                    to: "temp@example.com",
                    text: "Het this is create Email Data"
                });
            });
            socket.on('newEmail', function(newEmailData) {
                console.log('newEmailData: ', newEmailData);
            });
            socket.on('disconnect', function() {
                console.log('Server Disconnected...!!!');
            });