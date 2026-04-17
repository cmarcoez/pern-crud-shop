
# Tienda PERN Stack

Aplicación web con sistema CRUD desarrollada con el stack PERN (PostgreSQL, Express, React, Node.js). Permite a los usuarios explorar un catálogo de productos, añadir productos mediante el nombre del producto, el precio y una url de imagen, así como modificar los datos del producto. 

Incluye un icono de cesta de la compra, el cual muestra la cantidad de productos almacenados tanto en la sección visual de la web como en la base de datos. Esta aplicación está optimizada para ofrecer una experiencia de manejo de estado en tiempo real y una API REST robusta.

La interfaz de esta aplicación ha sido desarrollada con un enfoque completamente responsive en todos los dispositivos.
Para el diseño y estilo, se ha utilizado Tailwind CSS. Complementando a Tailwind, se ha integrado DaisyUI, una biblioteca de componentes que agiliza el desarrollo aportando componentes accesibles y temáticos.

La aplicación ofrece una interfaz moderna, sencilla y visualmente atractiva.


## Autores

- [cmarcoez](https://www.github.com/cmarcoez)


## Características

- Función para agregar productos introduciendo el nombre, precio e imagen url del mismo.
- Edición de cada producto.
- Opción para eliminar el producto (Esto eliminará el producto de la base de datos).
- Opción para recargar los productos de la página.
- Carrito de compras dinámico (muestra la cantidad de productos almacenados).

## Uso

- La aplicación muestra un sitio web con una serie de funcionalidades y de productos, todos ellos almacenados en una base de datos.
- La barra de navegación muestra el eslogan de la aplicación a la izquierda, junto con un icono de carrito de compras, el cual mostrará la cantidad de productos almacenados.
- Abajo del eslogan, se encuentra un botón llamado Añadir Producto. Al hacer clic en él, aparecerá una ventana modal con un form que contiene 3 inputs, los cuales tendrán la funcionalidad de añadir un producto mediante un nombre, un precio y una url de imagen (copia una dirección de enlace de cualquier foto y pégala dentro de este último input).
- Debajo del icono del carrito de compras se haya un icono de recarga, el cual actualizará los productos en la web.
- Los productos son mostrados individualmente mediante unos componentes en forma de contenedor. Cada producto añadido se mostrará como un contenedor con la imagen del producto, el nombre y el precio dado, así como de dos iconos, los cuales tienen la funcionalidad tanto de eliminar el producto como de editarlo.
- Al clicar sobre el icono azul (icono para editar el producto), se abrirá una ventana modal para editar los datos del producto. Una vez editados, estos datos se actualizarán tanto en la web como en la base de datos.


##  Tecnologías utilizadas

- Frontend: React(Vite), React Router, Axios, Context API, Tailwind CSS, DaisyUI.
- Backend: Node.js, Express, Arcjet.
- Base de datos: Neon (Base de datos Postgres).

## Instalación e Instrucciones

Inicializa un archivo .env:

- PORT=3000
- PGUSER=...
- PGPASSWORD=...
- PGHOST=...
- PGDATABASE=...
- ARCJET_KEY=...
- ARCJET_ENV=development


Clona este proyecto:

```bash
  $ git clone https://github.com/cmarcoez/pern-crud-shop.git
```

Levanta el backend:

```bash
  npm run dev
```

Levanta el frontend:

```bash
  npm start / npm run start
```

Endpoints principales:

- GET: '/' (Tomar los productos).
- GET: '/:id' (Tomar el producto según su id).
- POST: '/' (Crea un producto).
- PUT: '/:id' (Actualiza el producto).
- DELETE: '/:id' (Elimina el producto).

    
