import React from "react";
import styled from "@emotion/styled";

export const Tray = styled.div`
  min-width: 200px;
  padding: 2px;
  margin: 5px;
  border-color: black;
  border-style: solid;
  flex-grow: 0;
  flex-shrink: 0;
`;
export const Title = styled.div`
  font-size: large;
  font-weight: bold;
  text-decoration: underline;
  text-align: center;
  margin: 5px 0px 2px 0px;
`;

export class TrayWidget extends React.Component {
  render() {
    return (
      <Tray>
        <Title>Nodes</Title>
        {this.props.children}
      </Tray>
    );
  }
}
