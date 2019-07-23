import {Injectable} from "@angular/core";

@Injectable()
export class CommandService {

  public transactions = [];

  public addTransaction(transaction : any){
    this.transactions.push(transaction);
  }
}