import BigNumber from "bignumber.js";
import WalletStore from "../store/ContractStore";

export interface IBlockchainResult {
  tx: string;
}
export interface ITruffleContract {
  methods: {
    getReview: (id: BigNumber | number) => {
      call: () => Promise<string>;
    };
    getEstablishmetReviewMapping: (establishmentId: number) => {
      call: () => Promise<number[]>;
    };
    addReview: (review: string, establishmentId: number, datetimeInMillis: number) => {
      send: ({
        from: string,
        value: number
      }) => any;
    };
  };
  addEstablishment: (name: string, options: IContractOptions) => IBlockchainResult;
  getEstablishment: (id: number) => Promise<IEstablishment>;
  ReviewAdded: () => IReviewEvent;
  EstablishmentAdded: () => IEvent;
  getNextEstablishmentId: () => Promise<string>;
  // getReview: (id: BigNumber | number) => [number, string, string],
  getEstablishmetReviewMapping: (establishmentId: BigNumber) => BigNumber[];
  events: {
    ReviewAdded: (params: {}) => any;
  }
}

export interface IEvent {
  watch: (callback: (error: any, result: any) => void) => void
}

export interface IReviewEvent {
  watch: (callback: (error: any, result: IReviewEventResult) => void) => void
}

export interface IEstablishmentAddedEventResult {
  returnValues: {
    id: number;
    name: string;
  };
}
export interface IReviewEventResult {
  returnValues: {
    establishmentId: any,
    review: string,
    submitter: string,
    dateCreated: BigNumber,
  }
}

export interface IContractOptions {
  from?: string;
  value?: number;
}
export interface IContractProps {
  accounts: string[];
  contract: ITruffleContract;
}

export interface IEstablishment {
  id: number;
  name: string;
  address: string;
  numberOfReviews: BigNumber | number;
}

export interface IAppProps {
  store?: WalletStore;
}

export interface IReview {
  establishmentId: number;
  review: string;
  submitter: string;
  date: Date | undefined;
}