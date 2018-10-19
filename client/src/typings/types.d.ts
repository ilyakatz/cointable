import BigNumber from "bignumber.js";
import WalletStore from "../store/ContractStore";

export interface IBlockchainResult {
  tx: string;
}

interface ReadOnlyBlockchainMethod<T> {
  call: () => T
}

interface IBlockchainUpdateParams {
  from: string;
  value?: number;
}
interface UpdateBlockchainMethod<T> {
  send: (IBlockchainUpdateParams) => T;
}
export interface ITruffleContract {
  methods: {
    addEstablishment: (name: string) => UpdateBlockchainMethod<any>;
    getReview: (id: BigNumber | number) => ReadOnlyBlockchainMethod<Promise<string>>;
    getEstablishmetReviewMapping: (establishmentId: number) => ReadOnlyBlockchainMethod<Promise<number[]>>;
    addReview: (review: string, establishmentId: number, datetimeInMillis: number) => UpdateBlockchainMethod<any>;
    getEstablishment: (id: number) => ReadOnlyBlockchainMethod<Promise<IEstablishment>>;
    getNextEstablishmentId: () => ReadOnlyBlockchainMethod<Promise<string>>;
  };
  addEstablishment: (name: string, options: IContractOptions) => IBlockchainResult;
  addReview: (review: string, establishmentId: number, datetimeInMillis: number, options: {
    from: string,
    value: number
  }) => void;
  events: {
    ReviewAdded: (params: {}) => any;
    EstablishmentAdded: (params: {}) => any;
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
    submitter: string;
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