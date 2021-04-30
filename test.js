const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

app.set("port", 8080);
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const Pool = require("pg").Pool;
const config = {
    host: "localhost",
    user: "chadman",
    password: "ChadAdmin",
    database: "food_nutrition"
};

const pool = new Pool(config);

app.get("/api/food", async(req, res) => {
    const description = req.query.description;

    try{
        const template = "SELECT * FROM entries WHERE description ILIKE '%'||$1||'%'";
        const response = await pool.query(template, [req.query.q]);

        console.log(response.rows[0]);
        const responseMap = response.rows.map(function(item)
        {
            return {description: item.description, kcal: item.kcal, protein_g: item.protein_g, carbohydrate_g: item.carbohydrate_g, fat: (item.fa_sat_g + item.fa_mono_g + item.fa_poly_g)};
        });
        res.json({responseMap});
    }
    catch(err){ 
        console.error("Error running query " + err);
        res.json({status: "Error running query " + err});
    }
});

app.listen(port, () => {
    console.log('App is Running on port', port)
});