import { action, computed, observable, reaction } from 'mobx';
import { IEstablishment, IReview, IReviewEventResult, ITruffleContract } from '../typings/types';
import WalletStore from './ContractStore';
import EstablishmentsStore from './EstablishmentsStore';

class EstablishmentStore {
  @observable public establishment: IEstablishment;
  @observable public reviews: IReview[];
  private walletStore: WalletStore;
  private establishmentsStore: EstablishmentsStore;
  private id: number;

  constructor(id: number, walletStore: WalletStore, establishmentsStore: EstablishmentsStore) {
    this.id = id;
    this.walletStore = walletStore;
    this.establishmentsStore = establishmentsStore;
    this.reviews = observable.array([]);

    if (this.walletStore.isInitialized()) {
      this.watchForReviews(this.walletStore.contract);
    };

    reaction(
      () => this.walletStore.getContract,
      (contract) => {
        this.watchForReviews(contract);
      }
    );
  }

  @action.bound
  public setEstablishment(e: IEstablishment): void {
    this.establishment = e;
  }

  @computed
  public get getEstablishment(): IEstablishment {
    return this.establishment;
  }

  @computed
  public get getReviews(): IReview[] {
    return this.reviews;
  }

  @action.bound
  public loadEstablishment() {
    console.log("loadEstablishment");
    const v = this.establishmentsStore.getEstablishment(this.id);
    if (v) {
      return v;
    } else {
      // @ts-ignore
      this.walletStore.contract.methods.getEstablishment(this.id).call().then((res: IEstablishment) => {
        if (res) {
          const e = {
            address: res[2],
            id: this.id,
            name: res[1],
            numberOfReviews: res[3].valueOf()
          }
          this.establishmentsStore.addEstablishment(e);
          this.getReviewsFromBlockchain(this.walletStore, this.id);
          this.establishment = e;
        } else {
          console.error("No establishment with id ", this.id);
        }
      });
    }
  }

  @action.bound
  private getReviewsFromBlockchain(store: WalletStore, establishmentId: number) {
    console.log("Getting reviews for ", establishmentId);
    store.contract.methods.getEstablishmetReviewMapping(establishmentId).call().then((res) => {
      res.map((r) => {
        this.addReview(store, r.valueOf());
      });
    });
  }

  @action.bound
  private addReview(store: WalletStore, id: number) {
    store.contract.methods.getReview(id).call().then((res) => {
      const r = {
        date: new Date(parseInt(res[3].valueOf(), 0)),
        establishmentId: this.establishment.id,
        review: res[1],
        submitter: res[2],
      };
      this.reviews.push(r);
    });
  }

  private watchForReviews = (contract: ITruffleContract) => {
    console.log("Setting up listening to event");
    contract.events.ReviewAdded({}).on('data', (event: IReviewEventResult) => {
      console.log("Received new review from blockchain", event.returnValues);
      const establishmentId = parseInt(event.returnValues.establishmentId.valueOf(), 0);
      const review = event.returnValues.review;
      // @ts-ignore
      const date = new Date(parseInt(event.returnValues.dateCreated.valueOf(), 0));
      const r = {
        date,
        establishmentId,
        review,
        submitter: event.returnValues.submitter,
      };
      this.reviews.unshift(r);
    }).on('changed', (event) => {
      console.log(event);
      // remove event from local database
    }).on('error', (error) => {
      console.error("Error from event", error);
    });

    // reviewEvent.watch((error: any, result: IReviewEventResult) => {
    //   if (!error) {
    //     console.log("Received new review from blockchain", result.args);
    //     const establishmentId = parseInt(result.args.establishmentId.valueOf(), 0);
    //     const review = result.args.review;
    //     // @ts-ignore
    //     const date = new Date(parseInt(result.args.dateCreated.valueOf(), 0));
    //     const r = {
    //       date,
    //       establishmentId,
    //       review,
    //       submitter: result.args.submitter,
    //     };
    //     this.reviews.unshift(r);
    //   } else {
    //     console.log(result);
    //   }
    // });
  }
}

export default EstablishmentStore;