# Prueba Técnica - Desarrollo de Aplicación Web

Este repositorio contiene la solución a la prueba técnica solicitada, desarrollada con **Next.js**. La aplicación web implementa funcionalidades clave como autenticación, gestión de productos, y consumo de APIs externas, cumpliendo con los requerimientos planteados.

## Objetivo
Crear una aplicación web funcional que interactúe con una API externa para gestionar usuarios y productos, utilizando tecnologías modernas como React y Next.js.

## Funcionalidades Principales
- **Autenticación de usuario**: Login con token utilizando la API de DummyJSON.
- **Gestión de productos**:
  - Listar productos.
  - Agregar nuevos productos.
  - Eliminar productos.
- **Visualización del usuario autenticado**: Mostrar el nombre o email en el header.

### Requerimientos Adicionales Implementados
- **Búsqueda**: Filtrar productos por nombre.
- **Ordenamiento**: Ordenar productos por precio o nombre.
- **Paginación**: Mostrar productos en páginas.

---

## Instalación y Configuración

Sigue los pasos a continuación para ejecutar el proyecto localmente:

### 1. Clonar el repositorio
```bash
git clone https://github.com/GatiMhersi/logandview-alter5
cd logandview-alter5
```

### 2. Instalar dependencias
Asegúrate de tener **Node.js** instalado. Luego, ejecuta:
```bash
npm install
```

### 3. Ejecutar el proyecto
Inicia el servidor de desarrollo con:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.


---
## Funcionamiento del Panel de Administrador

### 1. Autenticación de Usuario
Se implementó un **componente de autenticación** que asegura que solo los usuarios logueados puedan acceder a las páginas principales del panel de administrador. Este sistema de autenticación se basa en el uso de un **middleware de Next.js**, que controla el acceso a las rutas protegidas mediante el **token de autenticación**. Este token se guarda **únicamente** cuando el usuario inicia sesión, lo que garantiza que la sesión sea válida.

### 2. Gestión de Estado Global
Una vez que el usuario ha iniciado sesión, se guarda su **información básica** en un **estado global** utilizando la librería **Zustand**. Este estado global permite que la información del usuario esté disponible en las diferentes secciones del panel de administración sin necesidad de hacer solicitudes adicionales.

### 3. Acciones Disponibles en el Panel de Administrador
Una vez autenticado, el usuario puede realizar tres acciones principales:

1. **Visualizar la información del usuario**: El usuario puede acceder a una vista tipo **currículum** con su información básica.

2. **Visualizar y gestionar productos**:
   - **Visualización**: Se realiza una llamada a una **API externa** para gestionar la base de datos de productos. Esta API proporciona todos los **queries** y métodos necesarios para interactuar con los productos.
   - **Búsqueda**: Se permite agregar un parámetro de búsqueda, lo que modifica la query para buscar coincidencias en los títulos y descripciones de los productos.
   - **Filtrado**: Es posible aplicar filtros para visualizar productos según ciertos criterios.
   - **Ordenación**: Los productos pueden ordenarse por **ID**, **nombre** o **precio**, en orden **ascendente** o **descendente**.
   - **Limitación**: Se puede limitar la cantidad de productos visualizados a un número fijo, facilitando la navegación por grandes volúmenes de datos.
   - **Creación de productos**: Se hace una solicitud para **crear un nuevo producto** en la base de datos externa. Una vez creado, el producto es guardado en el estado global para simular su visualización y agregado.
   - **Eliminación de productos**: Para eliminar un producto, se hace una llamada a la API para eliminarlo de la base de datos, y el estado global se actualiza para reflejar su eliminación.

3. **Cerrar sesión**: El usuario tiene la opción de **cerrar sesión**, lo que invalidará su token y lo redirigirá fuera del panel de administración.

### 4. Consideraciones
- El sistema de autenticación solo permite el acceso a las páginas del panel de administrador cuando el usuario tiene un token de sesión válido.
- La integración con la API externa permite manejar la base de datos de productos de manera eficiente, aunque las operaciones de creación y eliminación están simuladas a nivel de UI hasta que la respuesta de la API sea procesada correctamente.
- **Zustand** gestiona el estado global, lo que asegura que las actualizaciones de productos y la información del usuario se mantengan sincronizadas a lo largo de la aplicación.
