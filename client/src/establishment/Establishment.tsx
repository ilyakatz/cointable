import { reaction } from "mobx";
import { observer } from "mobx-react/custom"
import { Component } from "react";
import * as React from "react";
// @ts-ignore
import { Grid, Header, Image } from 'semantic-ui-react'
import WalletStore from "../store/ContractStore";
import EstablishmentsStore from "../store/EstablishmentsStore";
import EstablishmentStore from "../store/EstablishmentStore";
import { IEstablishment } from "../typings/types";

interface IParams {
  id: number;
}

interface IProps {
  match: { params: IParams };
  walletStore: WalletStore;
  establishmentsStore: EstablishmentsStore;
}

interface IState {
  id: number,
  establishmentStore: EstablishmentStore;
  establishment?: IEstablishment,
}

@observer
class Establishment extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      establishment: this.props.establishmentsStore.getEstablishment(props.match.params.id),
      establishmentStore: new EstablishmentStore(
        this.props.match.params.id,
        this.props.walletStore,
        this.props.establishmentsStore
      ),
      id: props.match.params.id,
    };
  }

  public componentDidMount = () => {
    this.props.walletStore.getWeb3Details();
    const that = this;
    reaction(
      () => this.props.walletStore.getContract,
      (contract) => {
        this.state.establishmentStore.loadEstablishment();
      }
    );
    reaction(
      () => this.state.establishmentStore.getEstablishment,
      (e) => {
        console.log("got e", e);
        that.setState((prevState) => {
          // establishment: e 
          return { establishment: e };
        });
      }
    );
  }

  public render() {
    if (!(this.props.walletStore.isInitialized())) {
      return (<div> Loading Web3, accounts, and contract... </div>);
    }

    if (this.state.establishment) {
      return (
        <Grid>
          <Grid.Column width={4}>
            <Image src='https://loremflickr.com/320/240/food' />
          </Grid.Column>
          <Grid.Column width={9}>
            <Header size='huge'>{this.state.establishment.name}</Header>
          </Grid.Column>
        </Grid>
      );
    } else {
      return (<div>...loading</div>);
    }
  }
}

export default Establishment;