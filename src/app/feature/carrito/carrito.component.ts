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
        console.log(x);
          this.items = x;
          this.cantidadTotal = x.length;
          this.precioTotal = x.reduce((sum, current) => sum + (current.precio * current.cantidad), 0);
        }
      })
  }

   public remove(producto:IItem)
    {
      this.carritoService.removeElementCart(producto);
    }

    goToCart() {
        this.router.navigate(['/pedidos/realizar']);
      }

}
