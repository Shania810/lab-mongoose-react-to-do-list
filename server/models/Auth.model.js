import {Schema,model} from "mongoose"
const userSchema = new Schema({
    name:{type: String,required: [true,'name is required'] },
    email:{type: String, match:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/},
    passwordHash:{type: String,required:true},
    toDos: {type: Schema.Types.ObjectId,ref:'Task',required:true}
},{timestamps: true})
const User = model('User',userSchema)
export default User