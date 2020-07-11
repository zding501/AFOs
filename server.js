const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');

let Orthotist = [
    {
        "Practice Name": "A",
        "Address": " 1 Anaconda Street",
        "Phone Number": " 0410******",
        "Orthotist Name": " Jim"
    },
    {
        "Practice Name": "B",
        "Address": " 2 Brook Street",
        "Phone Number": " 0420******",
        "Orthotist Name": " Kim"
    },
    {
        "Practice Name": "C",
        "Address": " 3 Cabbage Avenue",
        "Phone Number": " 0430******",
        "Orthotist Name": " Leo"
    },
    {
        "Practice Name": "D",
        "Address": " 4 Democracy Line",
        "Phone Number": " 0440******",
        "Orthotist Name": " Neil"
    },
    {
        "Practice Name": "E",
        "Address": " 5 Eclipse Avenue",
        "Phone Number": " 0450******",
        "Orthotist Name": " Hero"
    }
];

const Patient =[
    {
        "Name": "Kid1",
        "Address": " 1 One Street",
        "Phone Number": 111
    },
    {
        "Name": "Kid2",
        "Address": " 2 Two Street",
        "Phone Number": 222
    },
    {
        "Name": "Kid3",
        "Address": " 3 Three Street",
        "Phone Number": 333
    }
];

const Order = [
    {
        "Date": "07/03/2020",
        "Patient": "Kid1",
        "Orthotist": "A",
        "Foot": "Left",
        "Foot Length": 15,
        "Foot Width": 6,
        "Length Heel to Knee": 39,
        "Description": " None",
        "Order Status": " New"
    }
];

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set('json spaces', 40);

//get main page
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "AFOsOnlineOrderingPlatform.html" );
})

//get Orthotist page
app.get('/Orthotist.html', function (req, res) {
    res.sendFile( __dirname + "/" + "Orthotist.html" );
})
//show Orthotist
app.get('/showOrthotist', function (req, res) {
    let HTML =
        "<table id=\"OrthotistList\" border='1'>" +
        "    <tr id=\"index\">\n" +
        "        <td>Practice Name</td>\n" +
        "        <td>Address</td>\n" +
        "        <td>Phone Number</td>\n" +
        "        <td>Orthotist Name</td>\n" +
        "    </tr>";
    for (let o in Orthotist){
        let x = "<tr>" +
            "<td>" + Orthotist[o]["Practice Name"] + "</td>" +
            "<td>" + Orthotist[o]["Address"] + "</td>" +
            "<td>" + Orthotist[o]["Phone Number"] + "</td>" +
            "<td>" + Orthotist[o]["Orthotist Name"] + "</td>" +
            "</tr>"
        HTML += x;
    }
    HTML += "</table>"
    console.log(HTML);
    res.send(HTML);
})

//add Orthotist
app.post('/addOrthotist', function (req, res) {
    Orthotist.push(req.body);
    console.log( req );
    console.log( req.body );
    res.end( JSON.stringify(Orthotist))
})

//get Patient page
app.get('/Patient.html', function (req, res) {
    res.sendFile( __dirname + "/" + "Patient.html" );
})

//show Patient
app.get('/showPatient', function (req, res) {
    let HTML =
        "<table id=\"PatientList\" border='1'>" +
        "    <tr id=\"index\">\n" +
        "        <td>Name</td>\n" +
        "        <td>Address</td>\n" +
        "        <td>Phone Number</td>\n" +
        "    </tr>";
    for (let p in Patient){
        let x = "<tr id=P"+p+">" +
            "<td>" + Patient[p]["Name"] + "</td>" +
            "<td>" + Patient[p]["Address"] + "</td>" +
            "<td>" + Patient[p]["Phone Number"] + "</td>" +
            "<td>" + "<a href='/showSpecificPatient' id="+p+">Show</a> "+
            "<label onclick='http://127.0.0.1:8081/AFOsOnlineOrderingPlatform.html'>ccc</label>"+
            "</td>" +
            "</tr>"
        HTML += x;
    }
    HTML += "</table>"
    console.log(HTML);
    res.send(HTML);
})
//show Specific Patient
app.get('/showSpecificPatient', function (req, res) {
    console.log(req.body)
    // res.send(Patient[req.body["Name"]]);
    // console.log(Patient[req.body["Name"]]);
})
//add Patient
app.post('/addPatient', function (req, res) {
    Patient.push(req.body);
    console.log( req );
    console.log( req.body );
    res.end( JSON.stringify(Patient))
})

//edit Patient
app.put('/editPatient', function (req, res) {
    for(let p of Patient){
        console.log(p.Name);
        if(req.body.Name === p.Name){
            console.log("Changing " + p.Name +" 's Address and Phone Number!")
            p.Address = req.body.Address;
            p['Phone Number'] = req.body['Phone Number'];
        }
    }
    res.end( JSON.stringify(Patient))
})

//get Order page
app.get('/Order.html', function (req, res) {
    res.sendFile( __dirname + "/" + "Order.html" );
})

//show Order
app.get('/showOrder', function (req, res) {
    let HTML =
        "<table id=\"OrderList\" border='1'>" +
        "    <tr id=\"index\">\n" +
        "        <td>Date</td>\n" +
        "        <td>Patient</td>\n" +
        "        <td>Foot</td>\n" +
        "        <td>Foot Length</td>\n" +
        "        <td>Foot Width</td>\n" +
        "        <td>Length Heel to Knee</td>\n" +
        "        <td>Description</td>\n" +
        "        <td>Order Status</td>\n" +
        "    </tr>";
    for (let o in Order){
        let x = "<tr>" +
            "<td>" + Order[o]["Date"] + "</td>" +
            "<td>" + Order[o]["Patient"] + "</td>" +
            "<td>" + Order[o]["Foot"] + "</td>" +
            "<td>" + Order[o]["Foot Length"] + "</td>" +
            "<td>" + Order[o]["Foot Width"] + "</td>" +
            "<td>" + Order[o]["Length Heel to Knee"] + "</td>" +
            "<td>" + Order[o]["Description"] + "</td>" +
            "<td>" + Order[o]["Order Status"] + "</td>" +
            "</tr>"
        HTML += x;
    }
    HTML += "</table>"
    console.log(HTML);
    res.send(HTML);
})
//Add Order
app.post('/addOrder', function (req, res) {
    Order.push(req.body);
    console.log( req );
    console.log( req.body );
    res.end( JSON.stringify(Order))
})

//change Order
app.put('/changeOrder', function (req, res) {
    for(let o of Order){
        console.log(o);
        if(req.body.Name === o["Order Status"]){
            console.log("Changing " + p.Name +" 's Address and Phone Number!")
            p.Address = req.body.Address;
            p['Phone Number'] = req.body['Phone Number'];
        }
    }
    res.end( JSON.stringify(Patient))
})

const server = app.listen(8081, function () {

    const host = server.address().address
    const port = server.address().port

    console.log("http://localhost:" + port)

})