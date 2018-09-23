import { Component } from "react";
import * as React from "react";
// @ts-ignore
import { UserCard } from "react-ui-cards";
import "./Establishment.css";

interface IProps {
  name: string;
}

class Establishment extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: props.name
    };
  }

  public render() {
    return (
      <UserCard
        cardClass='float'
        header="https://loremflickr.com/320/240/food"
        name={this.props.name}
      />
    );
  }
}

export default Establishment;