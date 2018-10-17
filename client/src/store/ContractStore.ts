import { action, computed, observable, reaction } from 'mobx';
import * as Web3 from "web3";
import { ITruffleContract } from "../typings/types";
import { getContract } from "../utils/getWeb3";

class WalletStore {
  @observable public accounts?: string[];
  @observable public contract: ITruffleContract;
  @observable private web3: Web3;
  @observable private balance: string;

  // minimum amount to create a review is 1 ETH
  private MINIMUM_REVIEW_PAYMENT = 0.001 * (10 ** 18);

  constructor() {
    console.log("Wallet Store initializing....");
    this.getWeb3Details();

    reaction(
      () => this.getAccounts,
      () => {
        this.getBalanceFromEth();
      }
    );
  }

  @action
  public getWeb3Details = () => {
    try {
      const that = this;
      getContract().then(
        action("success", (result) => {
          that.setAccounts(result[0]);
          this.setContract(result[1]);
          this.setWeb3(result[2]);
          console.log("ContractStore Initialized!");
        })
      );
    } catch (error) {
      console.error("ContractStore(): An exception happened");
      console.error(error);
    }
  }

  @action.bound
  public setContract = (contract: ITruffleContract) => {
    console.log("Setting contract", contract);
    this.contract = contract;
  }

  @action.bound
  public setAccounts = (accounts) => {
    this.accounts = accounts;
  }

  @action.bound
  public setWeb3 = (web3: Web3) => {
    this.web3 = web3;
    this.web3.eth.defaultAccount = this.accounts[0];
  }

  @action.bound
  public setBalance = (balance: string) => {
    this.balance = balance;
  }

  public isInitialized(): boolean {
    return this.accounts !== undefined && this.contract !== undefined;
  }

  @computed
  public get getAccounts(): string[] {
    return this.accounts;
  }

  @computed
  public get getBalance(): string {
    return this.balance;
  }

  @computed
  public get getWeb3(): Web3 {
    return this.web3;
  }

  @action.bound
  public async getBalanceFromEth() {
    const balance = await this.web3.eth.getBalance(this.web3.eth.defaultAccount);
    // @ts-ignore
    const eth = this.web3.utils.fromWei(balance, "ether");
    this.setBalance(eth.toString());
  }

  @computed
  public get getContract(): ITruffleContract {
    return this.contract;
  }

  public async setReview(review: string, establishmentId: number) {
    const result = await this.contract.addReview(review, establishmentId, {
      from: this.accounts[0],
      value: this.MINIMUM_REVIEW_PAYMENT
    });
    console.log("setReview result is ", result);
  }
}

export default WalletStore;