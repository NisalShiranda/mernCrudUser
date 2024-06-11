const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

//Schema
const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
},{
    timestamps: true
});

const userModel = mongoose.model("user", schemaData);

// Read Data
//http://localhost:8080/
app.get("/", async (req, res) => {
    const data = await userModel.find();
    res.json({
        success: true,
        data: data
    })
})

//Create Data
//http://localhost:8080/create
app.post("/create", async (req, res) => {
    
    const data = new userModel(req.body); 
    await data.save();

    res.send({
        success: true,
        message: "Data save successfully"
    
    })
})

//Update Data
//http://localhost:8080/update
app.put("/update", async(req,res) => {
    
    const { id,...rest} = req.body;
    const data = await userModel.updateOne({_id: id}, rest);
    res.send({
        success: true,
        message: "Data updated successfully",
        data: data
    })
})

//Delete User
//http://localhost:8080/delete/id
app.delete("/delete/:id", async (req, res) => {

    const id = req.params.id;
    
    const data = await userModel.deleteOne({_id: id});
    res.send({
        success: true,
        message: "Data Deleted successfully",
        data: data
    })

});


// pw - Ebw7gJxE4SG5lkQs
mongoose.connect("mongodb+srv://nisal:Ebw7gJxE4SG5lkQs@cluster0.irihnu7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log("Server listening on port");
    })
})
.catch((error) => {
    console.log(error);
})







