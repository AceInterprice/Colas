class Auto {
    constructor(placas, propietario, horaEntrada) {
        this.placas = placas;
        this.propietario = propietario;
        this.horaEntrada = horaEntrada;
        this.next = null;
        this.prev = null;
    }
}

class Estacionamiento {
    constructor() {
        this.primero = null;
        this.ultimo = null;
    }

    agregarAuto(placas, propietario) {
        const horaEntrada = new Date();
        const nuevoAuto = new Auto(placas, propietario, horaEntrada);

        if (!this.primero) {
            this.primero = this.ultimo = nuevoAuto;
            this.primero.next = this.primero;
            this.primero.prev = this.primero;
        } else {
            nuevoAuto.prev = this.ultimo;
            nuevoAuto.next = this.primero;
            this.ultimo.next = nuevoAuto;
            this.primero.prev = nuevoAuto;
            this.ultimo = nuevoAuto;
        }
        alert(`Auto con placas ${placas} registrado con éxito.`);
    }

    retirarAuto() {
        if (!this.primero) {
            alert("No hay autos en el estacionamiento.");
            return null;
        }

        const autoSalida = this.primero;
        const horaSalida = new Date();
        const tiempoEstacionado = (horaSalida - autoSalida.horaEntrada) / 1000;
        const costo = tiempoEstacionado * 2;

        if (this.primero === this.ultimo) {
            this.primero = this.ultimo = null;
        } else {
            this.primero = this.primero.next;
            this.primero.prev = this.ultimo;
            this.ultimo.next = this.primero;
        }

        return {
            placas: autoSalida.placas,
            propietario: autoSalida.propietario,
            horaEntrada: autoSalida.horaEntrada,
            horaSalida: horaSalida,
            tiempoEstacionado: tiempoEstacionado.toFixed(2),
            costo: costo.toFixed(2)
        };
    }
}

const estacionamiento = new Estacionamiento();

function entradaAuto() {
    const placas = document.getElementById("placas").value.trim();
    const propietario = document.getElementById("propietario").value.trim();

    if (!placas || !propietario) {
        alert("Por favor ingrese ambos, placas y propietario.");
        return;
    }

    estacionamiento.agregarAuto(placas, propietario);
    document.getElementById("placas").value = "";
    document.getElementById("propietario").value = "";
}

function salidaAuto() {
    const infoSalida = estacionamiento.retirarAuto();
    const salidaDiv = document.getElementById("informacionSalida");

    if (infoSalida) {
        salidaDiv.innerHTML = `
            <strong>Placas:</strong> ${infoSalida.placas} <br>
            <strong>Propietario:</strong> ${infoSalida.propietario} <br>
            <strong>Hora de Entrada:</strong> ${infoSalida.horaEntrada.toLocaleTimeString()} <br>
            <strong>Hora de Salida:</strong> ${infoSalida.horaSalida.toLocaleTimeString()} <br>
            <strong>Tiempo Estacionado:</strong> ${infoSalida.tiempoEstacionado} segundos <br>
            <strong>Costo:</strong> $${infoSalida.costo} pesos
        `;
    } else {
        salidaDiv.innerHTML = "No hay vehículos en la cola.";
    }
}
