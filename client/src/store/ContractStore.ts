import { action, computed, observable, reaction } from 'mobx';
import { ITruffleContract } from "../typings/types";
import { getContract } from "../utils/getWeb3";

class WalletStore {
  @observable public accounts?: string[];
  @observable public contract: ITruffleContract;

  // minimum amount to create a review is 1 ETH
  private MINIMUM_REVIEW_PAYMENT = 10 ** 18;

  constructor() {
    console.log("Wallet Store initializing....")
  }

  @action
  public getWeb3Details = () => {
    try {
      const that = this;
      getContract().then(
        action("success", result => {
          that.setAccounts(result[0]);
          this.setContract(result[1]);
          that.log();
          console.log("ContractStore Initialized!");
        })
      );
    } catch (error) {
      console.error("ContractStore(): An exception happened");
      console.error(error);
    }
  }

  @action.bound
  public setContract = (contract) => {
    console.log("Setting contract", contract);
    this.contract = contract;
  }

  @action.bound
  public setAccounts = (accounts) => {
    this.accounts = accounts;
  }

  public log(): void {
    // console.log("ContractStore: Contract ", this.contract);
    // console.log("ContractStore: Accounts", this.accounts[0]);
  }

  public isInitialized(): boolean {
    return this.accounts !== undefined && this.contract !== undefined;
  }

  @computed
  public get getAccounts(): string[] {
    return this.accounts;
  }

  @computed
  public get getContract(): ITruffleContract {
    return this.contract;
  }

  public async setReview(review: string, establishmentId: number) {
    await this.contract.addReview(review, establishmentId, {
      from: this.accounts[0],
      value: this.MINIMUM_REVIEW_PAYMENT
    });
  }
}

export default WalletStore;