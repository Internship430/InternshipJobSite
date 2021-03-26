module.exports = (app) => {
     const User = require('./user.model')
     const {
         hash,
         verify
     } = require('./index');

     app.post('/register', async (req, res) => 
     {
        let user = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: await hash(req.body.password)
        })

        try
        {
            if(name == undefined || email == undefined || password == undefined)
            {
                console.error("Error: Parameters not given");
                res.json({status: "Error: Parameters not given"});
            }
            else
            {
                const template = "SELECT Uname FROM Users WHERE Uname = $1";
                const response = await pool.query(template, [name]);

                if(response.rowCount != 0)
                {
                    console.error('username taken');
                    res.json({status:'username taken'});
                }
                else
                {
                    const template = "INSERT INTO Users (name, email, password) VALUES ($1, $2, $3)";
                    const response = await pool.query(template, [name, email, password])
                    console.error('user added');
                    res.json({status: "user added"});
                }
            }
        }
        catch(err)
        {
            console.error("Error running query " + err);
            res.json({status: "Error running query " + err});
        }









         /*try {
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
         }*/
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

     
 };