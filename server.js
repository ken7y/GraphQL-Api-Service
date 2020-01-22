const express = require('express');
const expressGraphql = require('express-graphql');
const schema = require('./schema')
const axios = require('axios');
const protobufjs = require('protobufjs');

const app = express();
app.use('/graphql', expressGraphql({
    schema:schema,
    graphiql: true
}))

app.get('/', function(req, res){
    var foo = 
        axios.get('https://api.transport.nsw.gov.au/v1/gtfs/vehiclepos/buses',
        {
            headers:{
        "Authorization" : "apikey Qc9idalrWCIhYSKgNA0AVDFYXFOuaStWG66W"
            }
        })
    .then(res => console.log(res.data.ToObjec));
    res.send('welit')
})

app.listen(4000, () => {
    console.log('server is running on port 4000');

})