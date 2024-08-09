import mongoose from "mongoose";

const mongodb = mongoose.connect("mongodb://localhost/paginate-application")
.then(db => console.log(db.connection.host))
.catch(err => console.error(err))

export default mongodb