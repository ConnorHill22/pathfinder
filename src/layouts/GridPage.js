import React from "react";

import Grid from "../components/Grid";

export default function GridPage() {
  return (
    <div style={main}>
      <div style={gridLayout}>
        <Grid />
      </div>
    </div>
  );
}

// Styles
const main = {
  height: "100vh"
};

const gridLayout = {
  padding: "1rem 5rem 0rem 5rem"
};
