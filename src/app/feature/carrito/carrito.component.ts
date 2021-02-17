import { Component, OnInit } from '@angular/core';
import { CarritoService } from './service/carrito.service';
import { IItem } from '../../interfaces/item.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

   public items: Array<IItem>
   public precioTotal:number = 0;
   public cantidadTotal:number = 0;
   constructor(private carritoService:CarritoService, private router: Router,) { }

  ngOnInit(): void {
    this.carritoService.currentDataCart$.subscribe(x=>{
        if(x)
        {
          this.items = x;
          this.cantidadTotal = x.length;
          this.precioTotal = x.reduce((suma, actual) => suma + (actual.precio * actual.cantidad), 0);
        }
    })
  }

   public eliminarItem(producto:IItem)
    {
      this.carritoService.removeElementCart(producto);
       if (this.cantidadTotal <= 0){
              this.router.navigate(['/productos']);
       }


    }

    irRealizarPedido() {
      if (this.cantidadTotal > 0){
        this.router.navigate(['/pedidos/realizar']);
      }
    }
}
