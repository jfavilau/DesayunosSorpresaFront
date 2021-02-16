import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-base';

   public carritoAbierto:boolean = false;
    public cantProducts:number = 0;

  public companies: MenuItem[] = [
    { url: '/home', nombre: 'Home' },
    { url: '/productos/listar', nombre: 'Productos' },
    { url: '/pedidos/listar', nombre: 'Pedidos' }
  ];

  public cart(){
      this.carritoAbierto = !this.carritoAbierto;
    }


}
