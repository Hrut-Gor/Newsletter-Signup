const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/",function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

    const fname = req.body.Fname
    const lname = req.body.Lname
    const email = req.body.Email

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };

    const jsondata = JSON.stringify(data);
    const url = "https://us12.api.mailchimp.com/3.0/lists/a1410b23b4";

    const options = {
        method: "POST",
        auth: "patel:63f565ff4b755e6e8065ab55e24fdc38-us12"

    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsondata);
    request.end()

})

app.post("/failure", function (req, res) {
    res.redirect("/");
  })


app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
})

// API Key -- 63f565ff4b755e6e8065ab55e24fdc38-us12

// List-id -- a1410b23b4