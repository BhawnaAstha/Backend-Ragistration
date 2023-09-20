const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/employee-api',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('successfull connected')).catch((err) => console.log(err));