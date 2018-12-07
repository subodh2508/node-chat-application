var socket = io();
            socket.on('connect', function() {
                console.log('Connected to server...!!!');
                // socket.emit('createMessege', {
                //     from: "tom",
                //     text: "Hey this is create Email Data"
                // });
            });
            socket.on('newMessege', function(newMessegeData) {
                console.log('newMessegeData: ', newMessegeData);
            });
            socket.on('disconnect', function() {
                console.log('Server Disconnected...!!!');
            });