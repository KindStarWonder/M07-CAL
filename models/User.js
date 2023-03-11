///this is the user controller file
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  }
});



//fire a function (a mongoose hook) after a document is saved to the collection
userSchema.post('save', function(doc, next){
console.log('newuserwascreatedandsaved', doc);
  next();
});

// fire before saved
userSchema.pre('save', async function(next){
  //this refers to the User instance created in singup_post refered to in authController.js
  //use a prehook to hash passwords
  //netNinja says to hash a password before saving it to the database incase the database is every compromised
  //but the truth is that here is an even greater scope of consideration
  //your browser might transmit in plaintext over port 80 or you stream might be intercepted on your PC
  //because your PC can be compromised more likely by more common OS being targetted for escalation practices
  console.log('new user about to try to save');
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  //static method belonging to all user objects to log a user in
userSchema.statics.login = async function(email, password){
  ///go look in database for a user with that email
  const user = await this.findOne({email});
  if (user){
    console.log('Does entered hash(password) === stored and hashed password in DB?');
    const auth = await bcrypt.compare(password, user.password);//bcrypt will compare the hashes for us, and I forgot await so it was always allowing login on a promise without comparing, whew
    console.log(auth);
    if (auth){
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('email not found');
}

const User = mongoose.model('user', userSchema);

module.exports = User;