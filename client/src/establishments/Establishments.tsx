import { reaction } from "mobx";
import { observer } from "mobx-react/custom"
import { Component } from "react";
import * as React from "react";
import { Breadcrumb, Loader } from "semantic-ui-react";
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
    const establishmentEvent = this.props.store.contract.EstablishmentAdded();
    const that = this;
    establishmentEvent.watch((error: any, result: any) => {
      if (!error) {
        that.props.establishmentsStore.addEstablishment({
          address: "", // TODO 
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
      return (<Loader>Loading</Loader>);
    }

    return (
      <div className='ui four column doubling stackable grid container'>
        <div className="column">
          <NewEstablishment contract={this.props.store.contract} accounts={this.props.store.accounts} />
        </div>
        {this.props.establishmentsStore.getEstablishments().map(item => (
          <div className="column">
            <Establishment name={item.name} submitter={item.address} id={item.id} />
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
        this.props.store.contract.getEstablishment(i).then((res) => {
          that.props.establishmentsStore.addEstablishment({
            address: res[2],
            id: i,
            name: res[1]
          });
        });
      }
    });
  }
};

export default Establishments;
