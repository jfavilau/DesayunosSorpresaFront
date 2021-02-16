export class Producto {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    precio: number;
    cantidad: number;

    constructor(id: number, nombre: string, descripcion: string, imagen: string,  precio: number, cantidad: number) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}
