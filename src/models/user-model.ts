import { Model, Schema, Types, model } from 'mongoose';


interface IBaseUser {
    name: string;
    email: string;
    online: boolean;
}

interface IUser extends IBaseUser {
    password: string;
}

interface IUserJSON extends IBaseUser {
    uid: Types.ObjectId;
}

interface IUserMethods {
    toJSON(): IUserJSON;
}

type UserModel = Model<IUser, {}, IUserMethods>;


const userSchema = new Schema<IUser, UserModel, IUserMethods>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    }
});

userSchema.method( 'toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});


export const User = model( 'User', userSchema );
