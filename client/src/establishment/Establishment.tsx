import { reaction } from "mobx";
import { observer } from "mobx-react/custom"
import { Component } from "react";
import * as React from "react";
import { Link } from 'react-router-dom';
import { Comment, Divider, Loader } from 'semantic-ui-react';
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
    if (this.props.walletStore.isInitialized()) {
      this.state.establishmentStore.loadEstablishment();
    }
    reaction(
      () => this.props.walletStore.getContract,
      (contract) => {
        this.state.establishmentStore.loadEstablishment();
      }
    );
    reaction(
      () => this.state.establishmentStore.getEstablishment,
      (e) => {
        this.setState((prevState) => {
          return { establishment: e };
        });
      }
    );
  }

  public render() {
    if (!(this.props.walletStore.isInitialized())) {
      return (<Loader>Loading</Loader>);
    }

    if (this.state.establishment) {
      return (
        <div className='ui four column doubling stackable grid container'>
          <Breadcrumb size='small'>
            <Link to={`/`}>
              <Breadcrumb.Section>Home</Breadcrumb.Section>
            </Link>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section>{this.state.establishment.name}</Breadcrumb.Section>
          </Breadcrumb>
          <Divider horizontal={true} />
          <Grid>
            <Grid.Column width={4}>
              <Image src='/food.jpg' />
              <Header size='huge'>{this.state.establishment.name}</Header>
            </Grid.Column>
            <Grid.Column width={6}>
              <NewReview walletStore={this.props.walletStore} establishmentId={this.state.establishment.id} />
              <Header as='h3' dividing={true}>
                Community Reviews
              </Header>
              <Comment.Group >
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
      return (<Loader>Loading</Loader>);
    }
  }
}

export default Establishment;