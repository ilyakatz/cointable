import { action, computed, observable } from 'mobx';
import { IEstablishment } from '../typings/types';
import WalletStore from './ContractStore';
import EstablishmentsStore from './EstablishmentsStore';

class EstablishmentStore {
  @observable public establishment: IEstablishment;
  private walletStore: WalletStore;
  private establishmentsStore: EstablishmentsStore;
  private id: number;

  constructor(id: number, walletStore: WalletStore, establishmentsStore: EstablishmentsStore) {
    this.id = id;
    this.walletStore = walletStore;
    this.establishmentsStore = establishmentsStore;
  }

  @action.bound
  public setEstablishment(e: IEstablishment): void {
    this.establishment = e;
  }

  @computed
  public get getEstablishment(): IEstablishment {
    return this.establishment;
  }

  public loadEstablishment() {
    console.log("loadEstablishment");
    const v = this.establishmentsStore.getEstablishment(this.id);
    if (v) {
      return v;
    } else {
      // @ts-ignore
      this.walletStore.contract.getEstablishment(this.id).then((res) => {
        if (res) {
          console.log("Found establishment on the blockchain", res);
          const e = {
            address: res[2],
            id: this.id,
            name: res[1],
          }
          this.establishmentsStore.addEstablishment(e);
          this.establishment = e;
        } else {
          console.error("No establishment with id ", this.id);
        }
      });
    }
  }
}

export default EstablishmentStore;