# pt-perceptron

### Pasos para correro la app

**La app esta dockerizada**

1. Clonar el repositorio localmente.
2. Desde el root del proyecto, correr `docker-compose build` + `docker-compose up`.
3. Conectarse a `http://127.0.0.1:8000` para ver el backend si se quiere.
4. Para usar la app, conectarse a `http://127.0.0.1:5173` en un browser (`localhost` no funciona bien).

### Mejoras posibles

- La funcionalidad de login y autenticacion no se implemento, por lo que todos trabajan sobre las mismas to-dos y epicas. Por temas de tiempo no se pudo agregar.
- Una vez creada la epica, no se pueden agregar tasks existentes. Solo se pueden asignar tasks nuevas, entonces la funcionalidad "update" de las epicas no esta 100% completa. Pero se pueden desasignar tasks, editar titulo y eliminar epicas.
- Mejoras en el backend: se opto por usar un approach funcional a los endpoints del backend, en vez de uno basado en clases. Al ser primera vez trabajando en django, parecia ser la opcion mas simple, pero seria bueno aprender las metodologias optimas.
