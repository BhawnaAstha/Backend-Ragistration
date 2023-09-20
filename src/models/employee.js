const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        requires: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]

});

employeeSchema.methods.generateAuthToken = async function () {
    try {
        console.log(this._id);
        const token = jwt.sign({ _id: this._id }, "abcdefghijklmonpqrstuvwxyzkjhjhghfyujii");
        this.tokens = this.tokens.concat({ token: token });
        await this.save;
        console.log(token)
        return token;
    }
    catch (error) {
        res.send("the erroe part" + error);
        console.log("the error port" + error);
    };
}
const bcrypt = require("bcrypt")
employeeSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`this current password is ${this.password}`);
        this.cpassword = undefined;
    }
    next();
});

const employee = mongoose.model("employee", employeeSchema);
module.exports = employee;