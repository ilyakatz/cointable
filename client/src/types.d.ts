export interface ITruffleContract {
  addEstablishment: (name: string, options: IContractOptions) => void;
  getEstablishmentName: (id: number) => string;
  ReviewAdded: () => IEvent;
  EstablishmentAdded: () => IEvent;
  addReview: (review: string, establishmentId: number, options: {}) => void;
}

export interface IEvent {
  watch: (callback: (error: any, result: any) => void) => void
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
  name: string;
}