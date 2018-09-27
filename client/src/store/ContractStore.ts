import { observable } from 'mobx';
import { ITruffleContract } from "../typings/types";
import { getContract } from "../utils/getWeb3";

class WalletStore {
  @observable public accounts?: string[];
  @observable public contract: ITruffleContract;

  constructor() {
    try {
      const that = this;
      getContract().then((result) => {
        that.accounts = result[0];
        that.contract = result[1];
        that.log();
        console.log("ContractStore Initialized!");
      });
    } catch (error) {
      console.error("ContractStore(): An exception happened");
      console.error(error);
    }
  }

  public log(): void {
    console.log("ContractStore: Contract ", this.contract);
    console.log("ContractStore: Accounts", this.accounts[0]);
  }

  public isInitialized(): boolean {
    return this.accounts !== undefined && this.contract !== undefined;
  }

  public getAccounts(): string[] {
    return this.accounts;
  }
}

export default WalletStore;