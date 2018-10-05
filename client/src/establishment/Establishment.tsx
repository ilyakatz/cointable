import { reaction } from "mobx";
import { observer } from "mobx-react/custom"
import { Component } from "react";
import * as React from "react";
import { Link } from 'react-router-dom';
import { Comment, Divider } from 'semantic-ui-react';
// @ts-ignore
import { Breadcrumb, Grid, Header, Image } from 'semantic-ui-react';
import WalletStore from "../store/ContractStore";
import EstablishmentsStore from "../store/EstablishmentsStore";
import EstablishmentStore from "../store/EstablishmentStore";
import { IEstablishment, ITruffleContract } from "../typings/types";
import NewReview from "./NewReview";
import Review from "./Review";

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
  // reviews: IReview[],
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
        that.setState((prevState) => {
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
        <div>
          <Breadcrumb size='big'>
            <Link to={`/`}>
              <Breadcrumb.Section>Home</Breadcrumb.Section>
            </Link>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section>{this.state.establishment.name}</Breadcrumb.Section>
          </Breadcrumb>
          <Divider horizontal={true} />
          <Grid>
            <Grid.Column width={4}>
              <Image src='https://loremflickr.com/320/240/food' />
            </Grid.Column>
            <Grid.Column width={5}>
              <Header size='huge'>{this.state.establishment.name}</Header>
              <NewReview walletStore={this.props.walletStore} establishmentId={this.state.establishment.id} />
              <Comment.Group>
                {this.state.establishmentStore.getReviews.map(item => (
                  <div className="column">
                    <Comment.Group>
                      <Review review={item} />
                    </Comment.Group>
                  </div>
                ))}
              </Comment.Group>
            </Grid.Column>
          </Grid>
        </div>

      );
    } else {
      return (<div>...loading</div>);
    }
  }
}

export default Establishment;