import { Model, Schema, Types, model } from 'mongoose';


interface IMessage {
    from?: Types.ObjectId;
    to?: Types.ObjectId;
    message: string;
}

interface IMessageMethods {
    toJSON(): IMessage;
}

type MessageModel = Model<IMessage, {}, IMessageMethods>;


const messageSchema = new Schema<IMessage, MessageModel, IMessageMethods>({
    from: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

messageSchema.method( 'toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});


export const Message = model( 'Message', messageSchema );
