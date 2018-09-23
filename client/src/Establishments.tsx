import { Component } from "react";
import * as React from "react";
// @ts-ignore
import { UserCard } from "react-ui-cards";
import Establishment from "./Establishment";
import NewEstablishment from "./NewEstablishment";
import { IContractProps, IEstablishment } from "./types";

interface IState {
  establishments: IEstablishment[]
}
class Establishments extends Component<IContractProps, IState> {
  constructor(props: IContractProps) {
    super(props);
    this.state = {
      establishments: new Array<IEstablishment>()
    };
  }

  public componentDidMount = async () => {
    this.getCurrentEstablishments();

    const reviewEvent = this.props.contract.EstablishmentAdded();
    const that = this;
    reviewEvent.watch((error: any, result: any) => {
      if (!error) {
        that.setState((state) => {
          state.establishments.push({
            name: result.args.name
          });
          return state;
        });
      } else {
        console.log(result);
      }
    });
  }

  public render() {
    return (
      <div className='cardContainer'>
        {this.state.establishments.map(item => (
          <Establishment name={item.name} />
        ))}
        <NewEstablishment {...this.props} />
      </div>
    );
  }

  private getCurrentEstablishments = async () => {
    const response = await this.props.contract.getEstablishmentName(0);
    this.state.establishments.push({
      name: response
    });
  }
};

export default Establishments;