import BigNumber from "bignumber.js";
import WalletStore from "../store/ContractStore";

export interface ITruffleContract {
  addEstablishment: (name: string, options: IContractOptions) => void;
  getEstablishmentName: (id: number) => string;
  ReviewAdded: () => IReviewEvent;
  EstablishmentAdded: () => IEvent;
  addReview: (review: string, establishmentId: number, options: {
    from: string,
    value: number
  }) => void;
  getNextEstablishmentId: () => BigNumber;
}

export interface IEvent {
  watch: (callback: (error: any, result: any) => void) => void
}

export interface IReviewEvent {
  watch: (callback: (error: any, result: IReviewEventResult) => void) => void
}

export interface IReviewEventResult {
  args: { establishmentId: any, review: string }
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
}

export interface IAppProps {
  store?: WalletStore;
}

export interface IReview {
  establishmentId: number;
  review: string;
}