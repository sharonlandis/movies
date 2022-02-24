import React from "react";
import PropTypes from "prop-types";
import { Wrapper, Content } from "./Grid.styles";

const Grid = ({ header, children }) => (
  <Wrapper>
    <h1>{header}</h1>
    <Content>{children}</Content>
  </Wrapper>
);

Grid.propTypes = {
  //don't need o check children, it's a built in prop
  header: PropTypes.string,
};

export default Grid;
