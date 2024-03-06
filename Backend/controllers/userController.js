const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const { email, userName, password, passwordVerify } = req.body;

        // Validation

        if (!email || !userName || !password || !passwordVerify ) {
            return res.status(400).json({ errorMessage: "Please enter all required fields" })
        }

        if (password.length < 8) {
            return res.status(400).json({ errorMessage: "Please enter a password of at least 8 characters" })
        }

        if (password !== passwordVerify) {
            return res.status(400).json({ errorMessage: "Please enter the same password twice" })
        }

        const existingUser = await User.findOne( {email: email.trim()} );
        
        if (existingUser) {
            return res.status(400).json({ errorMessage: "An account with this email already exists" })
        }

        // Hash creation
        bcrypt.hash(password, 10, function(err, hash) {
            try {
            const createdUser = new User({
                email,
                userName,
                password: hash,
                });

            // Save created user
            createdUser.save()

            const token = JWT.sign(
            {
                user: createdUser._id,
                userName: createdUser.userName,
                role: createdUser.role
            }, process.env.JWT_Secret
            )
            res.cookie("token", token, {
                httpOnly: true
            })
            .send()
        } catch {
            res.status(
            { errorMessage: "Could not register, please try again later" })
        }
    });
              
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // validate
        if (!email || !password) {
          return res.status(400).json({ errorMessage: "Please enter all required fields" });
        }
    
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
          return res.status(401).json({ errorMessage: "Wrong email or password" });
        }
    
        const passwordCorrect = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (!passwordCorrect) {
          return res.status(401).json({ errorMessage: "Wrong email or password"});
        }
        
        const token = JWT.sign(
            {
                user: existingUser._id,
                userName: existingUser.userName,
                role: existingUser.role
            }, process.env.JWT_Secret
            )
            res.cookie("token", token, {
                httpOnly: true
            })
            .send()
      } catch {
        res.status(500).json({ errorMessage: "Could not login, please try again later."});
      }
};

exports.logout = (req, res) => {
    res
    .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    })
    .send();
};

exports.loggedIn = (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.json(false)
        }

        JWT.verify(token, process.env.JWT_Secret)

         return res.send(true)
    } catch {
        res.json(false)
    }
}

exports.userInfo = (req, res) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.json(false)
        }

        JWT.verify(token, process.env.JWT_Secret, (err, decoded) => {
            if (err) {
              return res.status(401).json({ errorMessage: "Invalid token" });
            }

            if (decoded.role == "admin") {
                return res.status(200).json({ role: "admin", userName: decoded.userName })
            } else {
                return res.status(200).json({ role: "user", userName: decoded.userName })
            }
        })
    } catch (error) {
        res.json(false)
    }
}