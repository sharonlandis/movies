import React from "react";
import PropTypes from "prop-types";
import searchIcon from "../../images/search-icon.svg";
import { Wrapper, Content } from "./SearchBar.styles";

const SearchBar = ({ setSearchTerm }) => {
  const [state, setState] = React.useState("");
  const initial = React.useRef(true);

  React.useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt="search icon" />
        <input
          type="text"
          placeholder="Search Movie"
          onChange={(event) => setState(event.currentTarget.value)}
          value={state}
        />
      </Content>
    </Wrapper>
  );
};

SearchBar.propTypes = {
  callBack: PropTypes.func,
};

export default SearchBar;
