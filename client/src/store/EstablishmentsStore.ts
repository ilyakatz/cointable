import { action, observable, ObservableMap } from 'mobx';
import { IEstablishment } from '../typings/types';

class EstablishmentsStore {
  @observable public establishments: ObservableMap<number, IEstablishment>

  constructor() {
    this.establishments = new ObservableMap<number, IEstablishment>();
  }

  @action
  public addEstablishment(e: IEstablishment): void {
    console.log("Setting: ", e.id, e.name);
    this.establishments.set(e.id, e);
  }

  public totalNum(): number {
    return this.establishments.size;
  }

  public getEstablishments() {
    return Array.from(this.establishments.toJS().values());
  }
}

export default EstablishmentsStore;