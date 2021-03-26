module.exports = (app) => {
     const User = require('./user.model')
     const {
         hash,
         verify
     } = require('./index');

     app.post('/register', async (req, res) => {
         try {
             let user = new User({
                 name: req.body.name,
                 email: req.body.email,
                 password: await hash(req.body.password)
             })
             let response = await user.save();
             res.status(200).json({
                 status: "Success",
                 data: response
             })
         } catch (err) {
             //handle error
         }
     });

     app.post('/login', async (req, res) => {
         try {
             let {
                 email,
                 password
             } = req.body;
             let user = await User.findOne({
                 email: email
             })
             if (!user) {
                 return res.status(400).json({
                     type: "Not Found",
                     msg: "Wrong Login Details"
                 })
             }
             let match = await verify(password, user.password); //the first is the hash, second is string
             if (match) {
                 res.status(200).json({
                     status: "Success",
                     message: "Correct Details",
                     data: user
                 })
                 console.log("verified"); //DEBUG
             }
         } catch (err) {
             // handle error
             console.log("error"); //DEBUG
         }
     })
 };
