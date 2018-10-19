import BigNumber from "bignumber.js";
import { reaction } from "mobx";
import { observer } from "mobx-react/custom"
import { Component } from "react";
import * as React from "react";
import { Loader } from "semantic-ui-react";
import WalletStore from "../store/ContractStore";
import EstablishmentsStore from "../store/EstablishmentsStore";
import { IEstablishment, IEstablishmentAddedEventResult } from "../typings/types";
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
    this.props.store.contract.events.EstablishmentAdded({
    }).on('data', (event: IEstablishmentAddedEventResult) => {
      console.log("Event recieved: ", event);
      this.props.establishmentsStore.addEstablishment({
        address: event.returnValues.submitter,
        id: event.returnValues.id.valueOf(),
        name: event.returnValues.name,
        numberOfReviews: 0 // TODO
      });
    }).on('changed', (event) => {
      console.log(event);
      // remove event from local database
    }).on('error', (error) => {
      console.error("Error from event", error);
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
            <Establishment establishment={item} />
          </div>
        ))}
      </div>
    );
  }

  private getCurrentEstablishments = () => {
    // @ts-ignore
    this.props.store.contract.methods.getNextEstablishmentId().call().then((result: string) => {
      const id = parseInt(result, 0);
      const that = this;
      for (let i = 0; i < id; i++) {
        // @ts-ignore
        this.props.store.contract.methods.getEstablishment(i).call().then((res: IEstablishment) => {
          that.props.establishmentsStore.addEstablishment({
            address: res[2],
            id: i,
            name: res[1],
            numberOfReviews: res[3].valueOf()
          });
        });
      }
    });
  }
};

export default Establishments;
