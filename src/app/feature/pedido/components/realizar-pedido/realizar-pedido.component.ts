import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductoService } from '@producto/shared/service/producto.service';
import { Producto } from '@producto/shared/model/producto';
import { PedidoService } from '../../shared/service/pedido.service';
import { CalendarService } from '../../shared/service/calendar.service';
import { CarritoService } from '../../../carrito/service/carrito.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Zona } from '../../shared/model/zona';
import { IItem } from '../../../../interfaces/item.interface';
import { Observable } from 'rxjs';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 200;

@Component({
  selector: 'app-realizar-pedido',
  templateUrl: './realizar-pedido.component.html',
  styleUrls: ['./realizar-pedido.component.css']
})
export class RealizarPedidoComponent implements OnInit {
   public listaProductos: Observable<Producto[]>;

  @ViewChild("modalMensaje") modal: ElementRef;

  isFestivo: boolean = false;
  fechaEntrega : string;
  arrayPedido: [];
  mensajeModal: string;
  pedidoForm: FormGroup;
  lista: Zona[] =[];
  items: Array<IItem>;
  precioTotal:number = 0;
  cantidadTotal:number = 0;

  openModal: NgbModalRef

  constructor(protected pedidoService: PedidoService, protected productoService: ProductoService, protected calendarService: CalendarService, private router: Router, private modalService: NgbModal, protected carritoService: CarritoService) { }

  ngOnInit() {
    this.construirFormularioPedido();
    this.lista.push(new Zona("Medellín Zona Metropolitana",10000));
    this.lista.push(new Zona("Sabaneta, Envigado, Itagüí",15000));
    this.lista.push(new Zona("Caldas, La Estrella, Bello, Niquía, San Antonio de Prado",20000));
    this.lista.push(new Zona("Girardota, Guarne, Copacabana",35000));
    this.lista.push(new Zona("Rionegro y otras ciudades",70000));

    this.listaProductos = this.productoService.consultar();

    this.carritoService.currentDataCart$.subscribe(x=>{
        if(x){
           this.pedidoForm.patchValue({
               producto : x
           });
           this.items = x;
           this.cantidadTotal = x.length;
           this.precioTotal = x.reduce((sum, current) => sum + (current.precio * current.cantidad), 0);
        }else{
            this.router.navigate(['/productos'], {skipLocationChange: true});
        }
     });

     this.pedidoForm.patchValue({
             total: this.precioTotal + Number(this.pedidoForm.value.valorAdicional) + Number(this.pedidoForm.value.zona)
         });
  }

   realizarPedido(){
      this.pedidoService.guardar(this.pedidoForm.value).subscribe((data) =>{
         this.arrayPedido = JSON.parse(JSON.stringify(data));
         this.mensajeModal = "Pedido generado numero " + this.arrayPedido['valor'];
         this.abrirModal(this.modal);
      },
      (error) => {
        this.mensajeModal = error.error.mensaje;
        this.abrirModal(this.modal);
      });
    }

  abrirModal(modal){
          this.openModal = this.modalService.open(modal);
          this.openModal.result.then((result) => {
               console.log(result);
                  this.router.navigate(['/pedidos/listar'], {skipLocationChange: true});

              }, (reason) => {
                  console.log(reason);
              });
  }

  onItemChange(){
      this.calendarService.consultar(this.pedidoForm.value.fechaEntrega).subscribe(data => {
         if (data.length > 0){
           this.pedidoForm.patchValue({
              valorAdicional: 10000
           });
           this.pedidoForm.patchValue({
              total: this.precioTotal + Number(this.pedidoForm.value.valorAdicional) + Number(this.pedidoForm.value.zona)
           });
           console.log(" Es festivo");
           console.log(Number(this.pedidoForm.value.valorAdicional));
         }else{
            this.pedidoForm.patchValue({
              valorAdicional: 0
            });
            this.pedidoForm.patchValue({
                          total: this.precioTotal + Number(this.pedidoForm.value.valorAdicional) + Number(this.pedidoForm.value.zona)
            });
            console.log("No Es festivo");
            console.log(Number(this.pedidoForm.value.valorAdicional));
         }
      })
  }

  onSelectZoneChange(){
    console.log(this.pedidoForm.value.fechaEntrega);
    this.pedidoForm.patchValue({
        total: this.precioTotal + Number(this.pedidoForm.value.valorAdicional) + Number(this.pedidoForm.value.zona)
    });
  }

   public eliminarItem(producto:IItem)
      {
        this.carritoService.removeElementCart(producto);
         if (this.cantidadTotal <= 0){
                this.router.navigate(['/productos']);
         }
         this.pedidoForm.patchValue({
                 total: this.precioTotal + Number(this.pedidoForm.value.valorAdicional) + Number(this.pedidoForm.value.zona)
             });
      }

  private construirFormularioPedido() {
    this.pedidoForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nombresApellidos: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                             Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      envia: new FormControl(''),
      recibe: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      barrio: new FormControl(''),
      celular: new FormControl('', [Validators.required]),
      mensajeTarjeta: new FormControl(''),
      fechaEntrega: new FormControl('', [Validators.required]),
      zona: new FormControl(10000, [Validators.required]),
      producto: new FormControl('', [Validators.required]),
      valorAdicional: new FormControl(0),
      total: new FormControl(0)
    });

  }

}
