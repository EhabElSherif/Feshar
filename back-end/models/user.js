const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
validator.isDate = value => !isNaN(new Date(value).getDate());

mongoose.set("useFindAndModify", false);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ["ADMIN", "GUEST","CRITIC"],
    default: "GUEST"
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    unique: true,
    validate: {
      validator: value => {
        return validator.isEmail(value);
      },
      message: "{VALUE} is not a valid email!"
    }
  },
  image_url: {
    type: String
  },
  phonenumber: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: value => {
        return validator.isMobilePhone(value);
      },
      message: "{VALUE} is not a valid phonenumber!"
    }
  },
  created_at: {
    type: String,
    required: true,
    default: new Date(),
    validate: {
      validator: value => {
        return validator.isDate(value);
      },
      message: "{VALUE} is not a valid date!"
    }
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ],
  name: {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    }
  }
});

userSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  return {
    _id: userObject._id,
    username: userObject.username,
    email: userObject.email
  };
};

userSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = "auth";
  let token = jwt.sign(
    {
      _id: user._id.toHexString(),
      access
    },
    process.env.JWT_SECRET
  );

  user.tokens = user.tokens.concat([
    {
      access,
      token
    }
  ]);

  return user.save().then(() => {
    return token;
  });
};

userSchema.methods.removeToken = function(token) {
  let user = this;

  return user.update({
    $pull: {
      tokens: {
        token: token
      }
    }
  });
};

userSchema.statics.findByToken = function(token) {
  let user = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return Promise.reject();
  }

  return user.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth" // I think that should be decoded.access not 'auth'
  });
};

userSchema.statics.findByCredentials = function(username_or_email, password) {
  let user = this;

  User.findOne({
    $or: [
      {
        email: username_or_email
      },
      {
        username: username_or_email
      }
    ]
  }).then(user => {
    if (!user) return Promise.reject();

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) return resolve(user);
        else reject();
      });
    });
  });
};

userSchema.pre("save", function(next) {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

let Model = mongoose.model("User", userSchema);

Model.createIndexes();

module.exports = Model;