//const net = require('net');

//let host = 'localhost';
//let port = 6969;
//let socket = net.Socket();

//socket.connect(port,host);


let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);

document.getElementById('body').appendChild(table);

let labelRow = document.createElement('tr');
let heading1 = document.createElement('th');
heading1.innerHTML = "User";
let heading2 = document.createElement('th');
heading2.innerHTML = "ID";
let heading3 = document.createElement('th');
heading3.innerHTML = "Version of SSGC";

labelRow.appendChild(heading1);
labelRow.appendChild(heading2);
labelRow.appendChild(heading3);
thead.appendChild(labelRow);

/**socket.onmessage = function(e){
    let json = JSON.parse(e.data);

    if(json.type == 'info'){
        let user;
        let id;
        let version;

        let newRow = document.createElement('tr');
        document.createElement('th').innerHTML(user);
        document.createElement('th').innerHTML(id);
        document.createElement('th').innerHTML(version);
    }
};**/