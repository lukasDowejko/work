const Customization = require("../models/customizationModel");
const JWT = require("jsonwebtoken");

exports.getCustom = async (req, res) => {
  try {
    const colours = await Customization.find();
    return res.json(colours);
  } catch (error) {
    return res.status(500).json({ errorMessage: "An error occured" });
  }
};

exports.updateColours = async (req, res) => {
  try {
    const {
      _id,
      background_colour,
      primary_colour,
      secondary_colour,
      colour,
    } = req.body;

    const token = req.cookies.token;

    JWT.verify(token, process.env.JWT_Secret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ errorMessage: "Invalid token" });
      }

      if (decoded.role === "admin") {
        await Customization.findOneAndUpdate(
          { _id: _id },
          {
            $set: {
              background_colour: background_colour.trim(),
              primary_colour: primary_colour.trim(),
              secondary_colour: secondary_colour.trim(),
              colour: colour.trim(),
            },
          },
          { upsert: true, new: true }
        );
        return res.status(200).json({ message: "Colours succesfully updated" });
      } else {
        return res.status(401).json({ errorMessage: "unauthorized user" });
      }
    });
  } catch (error) {
    return res.status(500).json({ errorMessage: "An error occured" });
  }
};
