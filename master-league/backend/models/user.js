import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    email : { type : String , unique : true },
    password : String , 
    role : {type : String , enum:['player' , 'master'], default : 'player'}
});
export default mongoose.model('User', userSchema);