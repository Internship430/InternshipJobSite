module.exports = (app) => {
     const User = require('./user.model')
     const {
         hash,
         verify
     } = require('./index');

     app.post('/register', async (req, res) => 
     {
         try {
             let user = new User(
             {
                 name: req.body.name,
                 email: req.body.email,
                 password: await hash(req.body.password)
             })

             let response = await user.save();
             res.status(200).json(
             {
                 status: "Success",
                 data: response
             })
         } catch (err) {
             //handle error
         }
     });

     app.post('/login', async (req, res) => 
     {
         try {
             let {
                 name,
                 password
             } = req.body;

             let user = await User.findOne({
                 name: name
             })
             
             if (!user) {
                 return res.status(400).json({
                     type: "Not Found",
                     msg: "Wrong Login Details"
                 })
             }

             let match = await verify(user.password, password);

             if (match) {
                 res.status(200).json(
                 {
                     status: "Success",
                     message: "Correct Details",
                     data: user
                 })
             }
         } catch (err) {
             // handle error
         }
     })

     app.options('/register', function(req, res, next)
     {
       res.header('Access-Control-Allow-Origin', "*");
       res.header('Access-Control-Allow-Methods', 'POST');
       res.header("Access-Control-Allow-Headers", "accept, content-type");
       res.header("Access-Control-Max-Age", "1728000");
       return res.sendStatus(200);
    });
 };