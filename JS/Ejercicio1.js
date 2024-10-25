class Cliente {
    constructor(turno, nombre, tipoMovimiento, horaLlegada) {
        this.turno = turno;
        this.nombre = nombre;
        this.tipoMovimiento = tipoMovimiento;
        this.horaLlegada = horaLlegada;
    }
}

class ColaBanco {
    constructor() {
        this.cola = [];
        this.turnoActual = 1;
    }

    insertaCola(nombre, tipoMovimiento) {
        if (this.colaLlena()) {
            alert("La cola está llena. No se pueden añadir más clientes.");
            return;
        }
        const horaLlegada = new Date();
        const cliente = new Cliente(this.turnoActual++, nombre, tipoMovimiento, horaLlegada);
        this.cola.push(cliente);
        this.actualizarVista();
    }

    eliminarCola() {
        if (this.colaVacia()) {
            alert("No hay clientes en la cola.");
            return;
        }
        const clienteAtendido = this.cola.shift();
        const horaAtencion = new Date();
        const tiempoEspera = (horaAtencion - clienteAtendido.horaLlegada) / 1000; // en segundos
        alert(`Cliente ${clienteAtendido.nombre} atendido. Tiempo de espera: ${tiempoEspera} segundos.`);
        this.actualizarVista();
    }

    colaVacia() {
        return this.cola.length === 0;
    }

    colaLlena() {
        return this.cola.length >= 5; // Ajustar si se necesita un tamaño máximo diferente
    }

    actualizarVista() {
        const tablaClientes = document.getElementById("tablaClientes");
        tablaClientes.innerHTML = "";
        this.cola.forEach(cliente => {
            const fila = tablaClientes.insertRow();
            fila.insertCell(0).innerText = cliente.turno;
            fila.insertCell(1).innerText = cliente.nombre;
            fila.insertCell(2).innerText = cliente.tipoMovimiento;
            fila.insertCell(3).innerText = cliente.horaLlegada.toLocaleTimeString();
        });

        const estadoCola = document.getElementById("estadoCola");
        estadoCola.innerText = this.colaVacia()
            ? "Cola vacía"
            : `Frente: ${this.cola[0].nombre} - Final: ${this.cola[this.cola.length - 1].nombre}`;
    }
}

const colaBanco = new ColaBanco();

function agregarCliente() {
    const nombre = document.getElementById("nombre").value;
    const tipoMovimiento = document.getElementById("tipoMovimiento").value;

    if (nombre.trim() === "") {
        alert("Por favor, ingresa el nombre del cliente.");
        return;
    }

    colaBanco.insertaCola(nombre, tipoMovimiento);
    document.getElementById("nombre").value = "";
}

function atenderCliente() {
    colaBanco.eliminarCola();
}