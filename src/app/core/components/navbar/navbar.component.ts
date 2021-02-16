import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';
import { CarritoService } from '../../../feature/carrito/service/carrito.service';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],

})
export class NavbarComponent implements OnInit {

  @Input()
  items: MenuItem[];

  public cantidadTotal:number = 0;
  public carritoAbierto:boolean = false;
  public cantProducts:number = 0;

  constructor(protected carritoService: CarritoService) { }

  ngOnInit() {
  this.carritoService.currentDataCart$.subscribe(x=>{
          if(x)
          {
            this.cantidadTotal = x.length;
          }
      })
  }

  public carrito(){
        this.carritoAbierto = !this.carritoAbierto;
      }

}
