export function Icono({ nombre, relleno = false }: { nombre: string; relleno?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="material-symbols-outlined"//esta classname es de google fonts, para que se vea el icono
      style={{ fontSize: 20, verticalAlign: 'middle', fontVariationSettings: `'FILL' ${relleno ? 1 : 0}` }}
    >
      {nombre}
    </span>
  );
}
