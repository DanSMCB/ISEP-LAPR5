export interface IElevadorPersistence {
    domainId: string;
    codigo: string;
    edificio: string;
    pisos: Array<{ piso: string }>;
}