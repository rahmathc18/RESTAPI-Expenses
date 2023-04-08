const express = require('express');
const PORT = 7000;
const app = express();
const fs = require("fs");
const { expenseRouter } = require('./routers');
app.use(express.json());

app.use('/expense', expenseRouter)

app.listen(PORT, () => {
    console.log(`Sever running on PORT : ${PORT}`);
})
