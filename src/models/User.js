import Types, { Schema, model } from "mongoose";

const EMAIL_PATTERN = /^(?<username>[A-Za-z]+)@(?<domain>[A-Za-z]+)\.(?<extension>[A-Za-z]+)$/i

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
    isConfirmed: {
        type: Boolean,
        required: true,
        default: 0//meaning false
    },
    confirmOTP: {
        type: String,
        required: false
    },
    otpTries: {
        type: Number,
        required: false,
        default: 0
    },
    status: {
        type: Boolean,
        required: true,
        default: 1
    }
}, {
    
    /*
    * special option. 
    * Mongoose will add two properties of type Date to this schema
    * 1. createdAt: a date representing when this document was created
    * 2. updatedAt: a date representing when this document was last updated
    * */
    timestamps: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
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