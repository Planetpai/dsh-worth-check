# dsh-worth-check · Comprobación de valor antes de empezar

Un plugin de DeepSeek que, al inicio de cada conversación, juzga el tamaño de la tarea y solo pregunta «¿vale la pena hacer esto?» para proyectos grandes, evitando empezar trabajos de los que no puedes retirarte limpiamente.

## Qué hace

En cada conversación, sea cual sea el modo, el modelo evalúa la tarea:

- **Tareas pequeñas** (charla, consultas, explicaciones, erratas) → hazlo sin interrumpir.
- **Proyectos grandes** → pregunta primero «¿vale la pena hacerlo ahora?» y continúa tras tu respuesta.

Señales de «proyecto grande»: requiere documento de traspaso, muchas compactaciones de contexto, muchos archivos/pasos, o implica «proyecto / sistema / desde cero».

Solo recuerda, nunca bloquea.

## Configuración

El plugin se divide en dos componentes que puedes activar o desactivar en la página de detalle del plugin, bajo «Componentes incluidos»:

| Componente | Valor | Función |
|---|---|---|
| Comprobación de valor | activado | Evalúa el tamaño, pregunta solo en proyectos grandes |
| Comprobación de «necesidad falsa» | desactivado | Comprobación extra de «necesidad falsa», desactivada por defecto |

## Instalación

> Aún no publicado en npm — usa las opciones de abajo por ahora.

**Opción 1: `.tgz` local (funciona hoy)**

1. Descarga `dsh-worth-check-*.tgz` de [GitHub Releases](https://github.com/planetpai/dsh-worth-check/releases), o empaquétalo localmente:
   ```bash
   node scripts/pack.mjs   # genera dsh-worth-check-<version>.tgz
   ```
2. GUI: **Plugins → Añadir plugin** → elige el archivo `.tgz`.

**Opción 2: npm (una vez publicado)**

```bash
dsh plugin --profile <tu-profile> add dsh-worth-check
```

## Licencia

MIT
