const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;

app.use(cors());

app.get('/', (req, res)=> {
    const timenow = new Date().getTime()%17;
    res.send(timenow.toString());
})

app.listen(port, () => {

})