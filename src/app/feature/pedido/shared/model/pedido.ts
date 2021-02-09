export class Pedido {
    id: number;
    email: string;
    nombresApellidos: string;
    fechaPedido: string;
    fechaEntrega: string;
    estado:string;

    constructor(id: number, email: string, nombresApellidos: string, fechaPedido: string, fechaEntrega: string,  estado: string) {
        this.id = id;
        this.email = email;
        this.nombresApellidos = nombresApellidos;
        this.fechaPedido = fechaPedido;
        this.fechaEntrega = fechaEntrega;
        this.estado = estado;
    }
}
