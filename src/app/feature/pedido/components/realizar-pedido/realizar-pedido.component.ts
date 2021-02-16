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
import { Observable } from 'rxjs';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 40;

@Component({
  selector: 'app-realizar-pedido',
  templateUrl: './realizar-pedido.component.html',
  styleUrls: ['./realizar-pedido.component.css']
})
export class RealizarPedidoComponent implements OnInit {
   public listaProductos: Observable<Producto[]>;

  @ViewChild("modalMensaje") modal: ElementRef;

  valorAdicional: number = 10000;
  isFestivo: boolean = false;
  fechaEntrega : string;
  arrayPedido: [];
  mensajeModal: string;
  pedidoForm: FormGroup;
  lista: Zona[] =[];
  valorDomicilio: number =0;
  valorProducto: number;

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
    this.valorDomicilio = Number(this.pedidoForm.value.zona);

    this.carritoService.currentDataCart$.subscribe(x=>{
        if(x){
          console.log(x)
           this.pedidoForm.patchValue({
                          producto : x
                        });
          console.log(this.pedidoForm.value.producto);
        }

     })
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
  console.log(this.valorDomicilio)
      this.calendarService.consultar(this.pedidoForm.value.fechaEntrega).subscribe(data => {

      if (data.length >0){
        this.isFestivo = true;
        this.valorDomicilio = Number(this.pedidoForm.value.zona) + this.valorAdicional;
      }
      this.pedidoForm.patchValue({
        total: Number(this.pedidoForm.value.valorProducto) + this.valorDomicilio
                          });
      })
      console.log(this.valorDomicilio)
  }

  onSelectZoneChange(){
  console.log(this.pedidoForm.value.fechaEntrega);
  if (this.isFestivo){
      this.valorDomicilio = Number(this.pedidoForm.value.zona)+ this.valorAdicional;
  }else{
      this.valorDomicilio = Number(this.pedidoForm.value.zona);
  }

        this.pedidoForm.patchValue({
          total: Number(this.pedidoForm.value.valorProducto) + this.valorDomicilio
        });
    }

  onSelectProductChange(value){
  console.log(this.valorDomicilio)
  this.listaProductos.subscribe(data =>{
      for (let dato of data){
          if (dato.id == value){
              this.pedidoForm.patchValue({
                valorProducto: dato.precio,
                total: dato.precio + this.valorDomicilio
              });
          }
      }
  })

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
      valorProducto: new FormControl(0),
      total: new FormControl(0, [Validators.required]),
      estado: new FormControl('GENERADO', [Validators.required])
    });

  }

}
