import React from "react";
import SearchBar from "./searchBar";
import Groups from "./groups";
import People from "./people";

function NavMenu() {
  return (
    <div className="w-1/4 min-w-fit gap-5 flex flex-col h-full">
      <SearchBar />
      <Groups />
      <People />
    </div>
  );
}

export default NavMenu;
