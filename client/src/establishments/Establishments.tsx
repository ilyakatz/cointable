import { reaction } from "mobx";
import { observer } from "mobx-react/custom"
import { Component } from "react";
import * as React from "react";
// @ts-ignore
import { UserCard } from "react-ui-cards";
import WalletStore from "../store/ContractStore";
import EstablishmentsStore from "../store/EstablishmentsStore";
import Establishment from "./Establishment";
import NewEstablishment from "./NewEstablishment";

interface IProps {
  store: WalletStore;
  establishmentsStore: EstablishmentsStore;
}
@observer
class Establishments extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {
    };
  }

  public componentDidMount = () => {
    this.props.store.getWeb3Details();
    const that = this;
    reaction(
      // observe when contract changes:
      () => this.props.store.getContract,
      // load establishments and setup listen event
      (contract) => {
        that.getCurrentEstablishments();
        that.listenToEvent();
      }
    );
  }

  public listenToEvent = () => {
    console.log("Setting up listening to event");
    const reviewEvent = this.props.store.contract.EstablishmentAdded();
    const that = this;
    reviewEvent.watch((error: any, result: any) => {
      if (!error) {
        that.props.establishmentsStore.addEstablishment({
          id: result.args.id.valueOf(),
          name: result.args.name
        });
      } else {
        console.log(result);
      }
    });
  }

  public render() {
    if (!(this.props.store.isInitialized())) {
      return (<div> Loading Web3, accounts, and contract... </div>);
    }

    return (
      <div className='ui four column doubling stackable grid container'>
        <div className="column">
          <NewEstablishment contract={this.props.store.contract} accounts={this.props.store.accounts} />
        </div>
        {this.props.establishmentsStore.getEstablishments().map(item => (
          <div className="column">
            <Establishment name={item.name} />
          </div>
        ))}
      </div>
    );
  }

  private getCurrentEstablishments = () => {
    // @ts-ignore
    this.props.store.contract.getNextEstablishmentId().then((result) => {
      const id = result.toNumber();
      const that = this;
      for (let i = 0; i < id; i++) {
        // @ts-ignore
        this.props.store.contract.getEstablishmentName(i).then((res) => {
          that.props.establishmentsStore.addEstablishment({
            id: i,
            name: res
          });
        });
      }
    });
  }
};

export default Establishments;
