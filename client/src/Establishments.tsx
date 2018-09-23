import { Component } from "react";
import * as React from "react";
// @ts-ignore
import { UserCard } from "react-ui-cards";
import Establishment from "./Establishment";
import NewEstablishment from "./NewEstablishment";
import { IContractProps } from "./types";

class Establishments extends Component<IContractProps, {}> {
  constructor(props: IContractProps) {
    super(props);
  }

  public render() {
    const establishments = [{
      name: "Avacado gallore"
    }
    ];
    return (
      <div className='cardContainer'>
        {establishments.map(item => (
          <Establishment name={item.name} />
        ))}
        <NewEstablishment />
      </div>
    );
  }
};

export default Establishments;