import React from "react";
import Typewriter from "typewriter-effect";
import { getPortfolioHome } from "../../data/portfolioAdminStore";

function Type() {
  const { typeStrings } = getPortfolioHome();
  return (
    <Typewriter
      options={{
        strings: typeStrings.length ? typeStrings : ["Software Developer"],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
