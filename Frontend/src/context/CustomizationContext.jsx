import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios"

export const CustomizationContext = createContext();

export const CustomizationContextProvider = ({ children }) => {
  const [ colourValues, setColourValues ] = useState({});

  async function getColours() {
    let response = await axios.get("http://localhost:3000/custom/getCustomization/")
    response.data.map((entry) => {
      setColourValues(entry)
      setColours(entry)
    })
  }

  function setColours(entry) {
    const root = document.querySelector(":root")

    root.style.setProperty("--background-color", `${entry.background_colour}`)
    root.style.setProperty("--Primary", `${entry.primary_colour}`);
    root.style.setProperty("--Secondary", `${entry.secondary_colour}`)
    root.style.setProperty("--colourColour", `${entry.colour}`)
  }

  useEffect(() => {
    getColours()
  }, [])  
    
  const contextValue = {colourValues, getColours};
  return (
    <CustomizationContext.Provider value={contextValue}>
      {children}
    </CustomizationContext.Provider>
  );
};

CustomizationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomizationContextProvider;
