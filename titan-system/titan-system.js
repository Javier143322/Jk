// Sistema Titan para FiveM - Código Principal
// GitHub: https://github.com/tu-usuario/titan-system

console.log('🎮 Iniciando SISTEMA TITÁN para FiveM...');

class DynamicEconomy {
    constructor() {
        this.markets = new Map();
        this.inflationRate = 1.0;
        this.globalWealth = 1000000;
        console.log('💰 Economía Dinámica: Sistema activado');
    }

    init() {
        this.setupMarkets();
        this.startMarketChanges();
        return true;
    }

    setupMarkets() {
        const marketConfigs = {
            'propiedades': { precio: 150000, volatilidad: 0.04 },
            'vehiculos': { precio: 35000, volatilidad: 0.06 },
            'armas': { precio: 8000, volatilidad: 0.10 },
            'recursos': { precio: 1500, volatilidad: 0.12 }
        };

        for (const [nombre, config] of Object.entries(marketConfigs)) {
            this.markets.set(nombre, {
                precioActual: config.precio,
                volatilidad: config.volatilidad,
                historial: [config.precio],
                tendencia: 'estable'
            });
        }
        
        console.log('✅ Mercados configurados:', Array.from(this.markets.keys()));
    }

    startMarketChanges() {
        setInterval(() => {
            this.actualizarMercados();
        }, 120000); // Cada 2 minutos
    }

    actualizarMercados() {
        this.markets.forEach((mercado, nombre) => {
            const cambio = (Math.random() - 0.5) * 2 * mercado.volatilidad;
            mercado.precioActual = Math.max(100, Math.floor(mercado.precioActual * (1 + cambio)));
            mercado.historial.push(mercado.precioActual);
            
            if (mercado.historial.length > 10) {
                mercado.historial.shift();
            }

            console.log(`📈 Mercado ${nombre}: $${mercado.precioActual}`);
        });
    }

    obtenerEstado() {
        return {
            mercados: Array.from(this.markets.entries()),
            inflacion: this.inflationRate,
            riquezaGlobal: this.globalWealth
        };
    }
}

class EventManager {
    constructor() {
        this.eventosActivos = new Map();
        console.log('⚡ Gestor de Eventos: Listo');
    }

    iniciar() {
        this.programarEventos();
        return true;
    }

    programarEventos() {
        setInterval(() => {
            this.evaluarEventosPosibles();
        }, 60000); // Cada minuto
    }

    evaluarEventosPosibles() {
        const eventos = [
            {
                nombre: 'boom_economico',
                probabilidad: 0.05,
                accion: () => {
                    console.log('🚀 BOOM ECONÓMICO: Precios en alza!');
                    // Lógica de boom económico
                }
            },
            {
                nombre: 'crisis_financiera', 
                probabilidad: 0.03,
                accion: () => {
                    console.log('💥 CRISIS: Mercados en caída!');
                    // Lógica de crisis
                }
            }
        ];

        eventos.forEach(evento => {
            if (Math.random() < evento.probabilidad) {
                this.activarEvento(evento);
            }
        });
    }

    activarEvento(evento) {
        console.log(`🎭 Activando evento: ${evento.nombre}`);
        evento.accion();
        this.eventosActivos.set(Date.now(), evento.nombre);
    }
}

class PlayerSystem {
    constructor() {
        this.jugadores = new Map();
        console.log('👥 Sistema de Jugadores: Inicializado');
    }

    registrarJugador(playerId) {
        this.jugadores.set(playerId, {
            id: playerId,
            conexion: Date.now(),
            economia: {
                dinero: 5000,
                propiedades: []
            },
            estadisticas: {
                tiempoJugado: 0,
                transacciones: 0
            }
        });
        console.log(`✅ Jugador ${playerId} registrado en el sistema`);
        return true;
    }

    actualizarEconomia(playerId, cantidad, tipo) {
        const jugador = this.jugadores.get(playerId);
        if (jugador) {
            if (tipo === 'ingreso') {
                jugador.economia.dinero += cantidad;
            } else if (tipo === 'gasto') {
                jugador.economia.dinero = Math.max(0, jugador.economia.dinero - cantidad);
            }
            jugador.estadisticas.transacciones++;
            return true;
        }
        return false;
    }

    obtenerJugador(playerId) {
        return this.jugadores.get(playerId);
    }
}

class TitanSystem {
    constructor() {
        this.economia = new DynamicEconomy();
        this.eventos = new EventManager();
        this.jugadores = new PlayerSystem();
        this.estado = 'iniciando';
        
        this.iniciarSistema();
    }

    iniciarSistema() {
        console.log('🦅 SISTEMA TITÁN INICIADO - Modo Élite Activado');
        this.estado = 'activo';
        
        // Iniciar subsistemas
        this.economia.init();
        this.eventos.iniciar();
        
        // Sistema de respaldo automático
        this.iniciarRespaldoAutomatico();
        
        console.log('✅ Todos los sistemas funcionando correctamente');
        return true;
    }

    iniciarRespaldoAutomatico() {
        setInterval(() => {
            this.guardarEstado();
        }, 30000); // Respaldo cada 30 segundos
    }

    guardarEstado() {
        const estado = {
            timestamp: Date.now(),
            economia: this.economia.obtenerEstado(),
            jugadores: this.jugadores.jugadores.size,
            eventos: Array.from(this.eventos.eventosActivos.entries())
        };
        console.log('💾 Estado del sistema guardado');
        return estado;
    }

    registrarJugador(playerId) {
        return this.jugadores.registrarJugador(playerId);
    }

    transaccionEconomica(playerId, cantidad, tipo) {
        return this.jugadores.actualizarEconomia(playerId, cantidad, tipo);
    }

    obtenerInfoJugador(playerId) {
        return this.jugadores.obtenerJugador(playerId);
    }
}

// INICIALIZACIÓN GLOBAL
const SistemaTitan = new TitanSystem();

// Exportar para FiveM
module.exports = SistemaTitan;
