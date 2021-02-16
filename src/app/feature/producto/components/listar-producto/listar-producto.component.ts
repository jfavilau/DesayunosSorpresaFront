import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoService } from '@producto/shared/service/producto.service';
import { CarritoService } from '../../../carrito/service/carrito.service';
import { IItem } from '../../../../interfaces/item.interface';
import { Producto } from '@producto/shared/model/producto';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {
  public listaProductos: Observable<Producto[]>;

  constructor(protected productoService: ProductoService, protected carritoService: CarritoService) { }

  ngOnInit() {
    this.listaProductos = this.productoService.consultar();
    console.log(this.listaProductos);
  }

   public addCart(product:IItem)
    {
      this.carritoService.changeCart(product);
    }

}
