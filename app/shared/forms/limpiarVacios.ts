// un campo opcional que el usuario dejo vacio llega como "": se manda como ausente
export function limpiarVacios<T>(valor: T): T {
  
    if (Array.isArray(valor)) return valor.map(limpiarVacios) as T; //recursiva, porque un arreglo puede tener otros arreglos u objetos dentro
    
    if (valor && typeof valor === 'object') {
        return Object.fromEntries( //fromEntries devuelve un objeto a partir de un array de pares clave-valor
            Object.entries(valor)
                .filter(([, v]) => v !== '')
                .map(([k, v]) => [k, limpiarVacios(v)]),
    ) as T;
  }
  return valor;
}
