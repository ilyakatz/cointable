import { action, computed, observable, ObservableMap } from 'mobx';
import { IEstablishment } from '../typings/types';
import WalletStore from './ContractStore';

class EstablishmentsStore {
  @observable public establishments: ObservableMap<number, IEstablishment>
  private walletStore: WalletStore;

  constructor(walletStore) {
    this.establishments = new ObservableMap<number, IEstablishment>();
    this.walletStore = walletStore;
  }

  @action
  public addEstablishment(e: IEstablishment): void {
    console.log("Setting: ", e.id, e.name);
    this.establishments.set(e.id, e);
  }

  public getEstablishment(id: number): IEstablishment {
    return this.establishments.get(id);
  }

  public totalNum(): number {
    return this.establishments.size;
  }

  public getEstablishments() {
    return Array.from(this.establishments.toJS().values());
  }
}

export default EstablishmentsStore;