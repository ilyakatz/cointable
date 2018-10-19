import BigNumber from "bignumber.js";
import WalletStore from "../store/ContractStore";

export interface IBlockchainResult {
  tx: string;
}
export interface ITruffleContract {
  addEstablishment: (name: string, options: IContractOptions) => IBlockchainResult;
  getEstablishment: (id: number) => Promise<IEstablishment>;
  ReviewAdded: () => IReviewEvent;
  EstablishmentAdded: () => IEvent;
  addReview: (review: string, establishmentId: number, datetimeInMillis: number, options: {
    from: string,
    value: number
  }) => void;
  getNextEstablishmentId: () => BigNumber;
  // getReview: (id: BigNumber | number) => [number, string, string],
  getReview: (id: BigNumber | number) => Promise<string>;
  getEstablishmetReviewMapping: (establishmentId: BigNumber) => BigNumber[];
}

export interface IEvent {
  watch: (callback: (error: any, result: any) => void) => void
}

export interface IReviewEvent {
  watch: (callback: (error: any, result: IReviewEventResult) => void) => void
}

export interface IReviewEventResult {
  args: {
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