# Admin Smart - Frontend

_Frontend del proyecto AdminSmart. Sistema web creado para la administración, gestión, comunicación y contabilidad de comunidades_

### Pre-requisitos técnicos

_Es necesario tener node. No es necesario tener instalado docker, pero si se necesita realizar algo con la imagen hay que tener en cuenta algunas cosideraciones que se detallarán mas tarde_

### Instalación

_Instalar con el gestor NPM_

```
npm install
npm audit fix --force
```

### Ejecución

_La tipica de npm_

```
npm start
```

o

```
npm run start
```

## Construido con Docker 

Se creó el Dockerfile haciendo que copie la carpeta de node_modules entera porque no dejaba pasarle package*.json y luego instalar por problemas de variables de entorno.
Entonces es necesario, para trabajar con docker, que primero se realice la instalación en el sistema operativo host y luego buildear

---
⌨️ con ❤️ por [ElPano](https://github.com/mpvaldez) 😊
