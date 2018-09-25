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
      <div className='ui four column doubling stackable grid container'>
        {this.state.establishments.map(item => (
          <div className="column">
            <Establishment name={item.name} />
          </div>
        ))}
        <div className="column">
          <NewEstablishment {...this.props} />
        </div>
      </div>
    );
  }

  private getCurrentEstablishments = async () => {
    const id = (await this.props.contract.getNextEstablishmentId()).toNumber();
    const that = this;
    for (let i = 0; i < id; i++) {
      // @ts-ignore
      this.props.contract.getEstablishmentName(i).then((result) => {
        that.state.establishments.push({
          name: result
        });
      });
    }
  }
};

export default Establishments;