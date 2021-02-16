import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';
import { ListarProductoComponent } from './feature/producto/components/listar-producto/listar-producto.component';


const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: 'productos', component: ListarProductoComponent, canActivate: [SecurityGuard]  },
  { path: 'pedidos', loadChildren: () => import('./feature/pedido/pedido.module').then(mod => mod.PedidoModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
