
const http = require('http');

http.get('http://host.docker.internal:8080/api/v1/auth/status', (res) => {
    console.log(`Status Code: ${res.statusCode}`);

    res.on('data', (chunk) => {
        console.log(`Body: ${chunk}`);
    });
}).on('error', (err) => {
    console.error('Error: ', err.message);
});
