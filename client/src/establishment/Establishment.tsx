import { reaction } from "mobx";
import { observer } from "mobx-react/custom"
import { Component } from "react";
import * as React from "react";
// @ts-ignore
import { Grid, Header, Image } from 'semantic-ui-react';
import { Comment } from 'semantic-ui-react';
import WalletStore from "../store/ContractStore";
import EstablishmentsStore from "../store/EstablishmentsStore";
import EstablishmentStore from "../store/EstablishmentStore";
import { IEstablishment, IReview, IReviewEventResult, ITruffleContract } from "../typings/types";
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
  reviews: IReview[],
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
      reviews: new Array()
    };
  }

  public componentDidMount = () => {
    this.props.walletStore.getWeb3Details();
    const that = this;
    reaction(
      () => this.props.walletStore.getContract,
      (contract) => {
        this.state.establishmentStore.loadEstablishment();
        this.watchForReviews(contract);
      }
    );
    reaction(
      () => this.state.establishmentStore.getEstablishment,
      (e) => {
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
        <div>
          <Grid>
            <Grid.Column width={4}>
              <Image src='https://loremflickr.com/320/240/food' />
            </Grid.Column>
            <Grid.Column width={5}>
              <Header size='huge'>{this.state.establishment.name}</Header>
              <NewReview walletStore={this.props.walletStore} establishmentId={this.state.establishment.id} />
              <Comment.Group>
                {this.state.reviews.map(item => (
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

  private watchForReviews = (contract: ITruffleContract) => {
    const reviewEvent = contract.ReviewAdded();
    reviewEvent.watch((error: any, result: IReviewEventResult) => {
      if (!error) {
        console.log("Recieved new review from blockchain");
        const establishmentId = parseInt(result.args.establishmentId.valueOf(), 0);
        const review = result.args.review;
        const r = {
          establishmentId,
          review
        };
        this.setState((state) => {
          state.reviews.push(r);
          return state;
        });
      } else {
        console.log(result);
      }
    });
  }

  private loadReviews = (contract: ITruffleContract) => {
    console.log("Loading all reviews for", this.state.id);
  }
}

export default Establishment;