import { useContext, useState, useEffect } from "react";
import refreshIcon from "../../../assets/images/svg/rotate-right-solid.svg";
import { CustomizationContext } from "../../../context/CustomizationContext";
import axios from "axios";
import "./card.css";

function Card() {
  const { colourValues, getColours } = useContext(CustomizationContext);
  const _id = colourValues._id;
  const [hexValue, setHexValue] = useState({});

  useEffect(() => {
    // Set initial hex values when component mounts
    const initialHexValues = {};
    Object.keys(colourValues).forEach((key) => {
      if (key !== "_id") {
        initialHexValues[key] = colourValues[key];
      }
    });
    setHexValue(initialHexValues);
  }, [colourValues]);

  function handleSumbitPatch(e) {
    e.preventDefault();

    const updatedColours = { _id };

    e.target.querySelectorAll(".colour-input").forEach((input) => {
      const key = input.id;
      updatedColours[key] = input.value;
    });

    try {
      axios.patch("http://localhost:3000/custom/updateColours", updatedColours);
      getColours();
    } catch (error) {
      console.log(error);
    }
  }

  function handleHexChange(key, hex) {
    setHexValue((prevHexValue) => ({
      ...prevHexValue,
      [key]: hex,
    }));
  }

  async function resetDefaultColours(e) {
    e.preventDefault();

    const defaultColours = {
      _id: _id,
      background_colour: "#f5f5f5",
      primary_colour: "#bbbcbd",
      secondary_colour: "#d1d5db",
      colour: "#c3c8d4",
      border_colour: "#d1d5db",
    };

    try {
      await axios.patch(
        "http://localhost:3000/custom/updateColours",
        defaultColours
      );
      console.log(defaultColours);
      getColours();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="custom-colour-panel flex-col rounded m-auto mt-[10%] p-5 w-[25rem]">
      <div className="flex">
        <button onClick={(e) => resetDefaultColours(e)}>
          <img src={refreshIcon} alt="Refresh button" className="w-9" />
        </button>
        <span className="p-2">Reset colours to default</span>
      </div>
      <form onSubmit={handleSumbitPatch}>
        {Object.keys(colourValues).map((key) => {
          if (key === "_id") {
            return null;
          }

          const value = colourValues[key];

          return (
            <div key={key}>
              <label htmlFor={key}>{key}:</label>
              <input
                className="colour-input"
                type="text"
                id={key}
                defaultValue={value}
                onChange={(e) => handleHexChange(key, e.target.value)}
              />
              <span
                className="color-preview"
                style={{
                  width: "20px",
                  height: "20px",
                  padding: "0.3rem",
                  backgroundColor: hexValue[key],
                  border: "1px solid #000",
                  borderRadius: "5px",
                }}
              >
                AaBb
              </span>
            </div>
          );
        })}
        <input
          type="submit"
          value="Update colours"
          style={{
            border: "1px solid #000",
            cursor: "pointer",
            padding: "0.3rem 0.5rem",
            borderRadius: "5px",
          }}
        />
      </form>
    </div>
  );
}

export default Card;
