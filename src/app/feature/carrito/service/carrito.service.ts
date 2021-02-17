import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IItem } from '../../../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito = new BehaviorSubject<Array<IItem>>(null);
  public currentDataCart$ = this.carrito.asObservable();

  constructor() { }

  public changeCart(newData: IItem) {

    let listaCarrito = this.carrito.getValue();

    if(listaCarrito)
    {

      let objIndex = listaCarrito.findIndex((obj => obj.id == newData.id));

      if(objIndex != -1)
      {
        listaCarrito[objIndex].cantidad += 1;
      }
      else {
        listaCarrito.push(newData);
      }
    }

    else {
      listaCarrito = [];
      listaCarrito.push(newData);
    }

    this.carrito.next(listaCarrito);
  }

  public removeElementCart(newData:IItem){

    let listaCarrito = this.carrito.getValue();

    let objIndex = listaCarrito.findIndex((obj => obj.id == newData.id));
    if(objIndex != -1)
    {

      listaCarrito[objIndex].cantidad = 1;

      listaCarrito.splice(objIndex,1);
    }

    this.carrito.next(listaCarrito);

  }

}
