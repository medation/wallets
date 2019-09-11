import {Injectable} from "@angular/core";

@Injectable()
export class CommandService {

  public transactions = [];

  public addTransaction(transaction : any){
    this.transactions.push(transaction);
  }

  public removeTransaction(transaction : any){
    this.transactions = this.transactions.filter(data => {
      data != transaction
    });
  }
}