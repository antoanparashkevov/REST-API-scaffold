import Types, { Schema, model } from "mongoose";

const EMAIL_PATTERN = /^(?<username>[A-Za-z]+).*@(?<domain>[A-Za-z]+)\.(?<extension>[A-Za-z]+)$/ig

const userSchema = new Schema({
    username: {
        type: String,
        minlength: [5, 'Username should be at least 5 characters long!'],
        required: [true, 'Username is required'],
        unique: [true, 'Username is already in use'],//TODO see the assignment
    },
    email: {
        type: String,
        minlength: [6, 'Email should be at least 6 characters long!'],
        required: [true, 'Email is required!'],
        unique: [true, 'Email is already in use!'],//TODO see the assignment
        validate: {
            validator: (v) => {//validation function
                return EMAIL_PATTERN.test(v)
            },
            message: (props) => `${props.value} is not a valid email!`
        }
    },
    hashedPassword: {
        type: String,
        required: true
    },
    roles: {
        type : [ String ],
        default: ['user'],
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
})

//it is executed when a document is saved.
userSchema.pre('save', (next) => {
    this.updated_at = Date.now();
    next();
})

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2//case insensitive
    }
})

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2//case insensitive
    }
})

const User = model('User', userSchema)

export default User;