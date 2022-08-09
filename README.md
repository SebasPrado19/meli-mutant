# Prueba Mutante

Testeo de cadenas de ADN el cual identifica si dentro de esta contiene el gen mutante

### Prerequisitos

#### Acceso al proyecto para conectar con la base de datos

Se debe solicitar al propietario del proyecto que conceda los permisos de acceso necesarios con el fin de poder realizar la conexión a la base
de datos de manera local desde su máquina.

#### Llave de acceso al administrador de secretos

Ya que las credenciales a la base de datos no se encuentran en el código, es necesario que consulte con el propietario del proyecto la llave de
la cuenta de servicio que puede acceder a los secretos de GCP y así obtener las credenciales.

#### Node.js

Antes de empezar a trabajar con el módulo de prueba de ADN se deben tener instalado en su máquina Node.js en su versión 12.18.0 o posterior.

Para descargar Node.js visite https://nodejs.org/en/download/.

#### Verificar prerequisitos

Puede verificar por medio del siguiente comando en la terminal si tiene instalada una versión correcta de Node.js

```bash
$ node -v
```

Debe verificar que exista el archivo secret_manager_key.json en la ruta ./util/

Debe poder ejecutar el archivo ./config/proxy.bat (en Windows) y obtener una conexión exitosa hacia la base de datos

### Instalar paquetes

Una vez instalado Node.js en la máquina, y validada la correcta versión, se puede configurar el ambiente de desarrollo instalando los paquetes
por medio del siguiente comando en la terminal.

```bash
$ npm install
```

## Probando el módulo

### Configuración de pruebas

Durante el tiempo que dure las pruebas de manera local, se debe mantener activa la ejecución del archivo ./config/proxy.bat

Inicializar el módulo por medio del siguiente comando

```bash
$ node server.js
```

Debe aparecer el siguiente mensaje en terminal 

```bash
$ Server listening on port 8000...
```
En caso de querer cambiar el puerto de ejecución se debe realizar este cambio en el archivo server.js.

### Pruebas locales

A continuación se exponen los servicios que existen dentro del módulo.

#### Consulta de ADN mutante

Para consultar si una cadena de ADN es mutante se debe enviar por medio de método POST a la ruta /mutant/ el body con la siguiente estructura (ejemplo caso mutante).

```bash
{
    "dna": [
        "ATGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCACTG"
    ]
}
```
Para realizar la validación, el módulo se asegura de que la matriz enviada tenga una dimensión de NxN de lo contrario tomará como una cadena no mutante.

Se identifica como cadena portadora del gen mutante a aquella que dentro de su matriz contenga 4 o más letras iguales de forma horizontal, vertical u oblicua de izquierda a derecha y de derecha a izquierda.

```bash

A T G C G A                 A T G C G A
C A G T G C                 C A G T G C
T T A T T T                 T T A T G T
A G A C G G                 A G A A G G
G C G T C A                 C C C C T A
T C A C T G                 T C A C T G

No-Mutante                  Mutante
```

Solo se tendrán en cuenta como gen x (mutante) cadenas seguidas con las letras A,T,C,G.

Si la cadena es portadora del gen mutante se responde con un HTTP-200 OK y el mensaje

```bash
{
    "success": "Se ha identificado un ADN mutante"
}
```

En caso contrario se retorna un estado HTTP-403 forbidden y el mensaje

```bash
{
    "error": "forbiden west"
}
```

#### Consulta de estadísticas

Se pueden consultar las estadísticas por medio de una petición por medio del método GET a la ruta /mutant/stats.

El cual retornará la siguiente respuesta

```bash
{
    "count_mutant_dna": 5,
    "count_human_dna": 6,
    "ratio": 0.45454545454545453
}
```

Donde count_mutant_dna corresponde a la cantidad de mutantes encontrados, count_human_dna corresponde a la cantidad de no mutantes, y ratio el porcentaje de mutantes respecto al total de muestras tomadas.


