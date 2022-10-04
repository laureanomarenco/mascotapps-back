# Mascotapp
![Image text](https://res.cloudinary.com/dfbxjt69z/image/upload/v1663276317/mascotapps/perrito_apwyz0.png)
## ¡Bienvenido a [Mascotapp](https://mascotapps.vercel.app/)!

## Introducción
Mascotapp es una página pensada para ayudar a conectar mascotas con sus dueños y fue desarrollada como proyecto final para el curso de desarrollo web Full-Stack de [Henry](https://www.soyhenry.com/). En Mascotapp podes publicar o ver mascotas extraviadas o en adopción con un diseño interactivo que te premia con puntos e insignias a medida que vas avanzando en el uso de la página. A continuación te contaremos un poco del proceso con el que llevamos adelante el proyecto.

## Workflow
Para el desarrollo usamos un repositorio para el [Backend](https://github.com/laureanomarenco/mascotapps-back) y otro para el [Frontend](https://github.com/laureanomarenco/mascotapps-front).
Además realizamos deploys desde el comienzo del proyecto en [Vercel](https://vercel.com/) para el front y en [Railways](https://railway.app/) para el back, con etapas de producción y de stagging basandonos en el modelo de CI/CD, permitiendonos ir comprobando las integración de las funcionalidades en la nube.

## Herramientas utilizadas
### Frontend
Utilizamos [React](https://reactjs.org/) como framework con [Redux](https://es.redux.js.org/) para el manejo de estados globales. Además en cuanto a los estilos usamos [Tailwind](https://tailwindcss.com/), y también [Material UI](https://mui.com/) para algunos detalles como el autocompletado. Para las alertas implementamos [Sweet Alert](https://sweetalert.js.org/) y para los iconos [React-Icons](https://react-icons.github.io/react-icons/).
Consultamos una api para la [georeferencia](https://datosgobar.github.io/georef-ar-api/) de provincias y ciudades, que es un punto importante a tener estandarizado en la página, debido a que se envian notificaciones a los usuarios registrados cercanamente cuando se postean nuevas mascotas perdidas, este sistema de notificaciones utiliza [Web-Push](https://www.npmjs.com/package/web-push).
Utilizamos [Stripe](https://stripe.com/es-419-us) para poder recibir donaciones tanto en USD como en pesos argentinos. Por otro lado le permitimos a los usuarios agregar un link de pago con [Mercado Pago](https://www.mercadopago.com.ar/) en caso de que sean usuarios muy activos y esten dispuestos a recibir donaciones.
Por último como sistema de autenticación aplicamos [Auth0](https://auth0.com/), que controla el registro de usuario desde el frontend y envía el token de usuario hacia el backend para controlar el acceso a las rutas.

### Backend
Utilizamos [Express](https://expressjs.com/es/) como framework de desarrollo para el backend, usando [TypeScript](https://www.typescriptlang.org/) como lenguaje, lo que nos ayudo a prevenir muchos errores. Usamos [Sequelize](https://sequelize.org/) para modelar nuestra database [PostgreSQL](https://www.postgresql.org/), implementando tablas para usuarios y mascotas, y teniendo y actualizando varias propiedades en las disitntas rutas que existen en la página, utilizando varias operaciones lógicas sobre todo en las instanciaciones de Reviews, Puntos e Insignias que recopilan información sobre la interacciones de los usuarios con la plataforma. [JWT](https://jwt.io/) sirvió para armar los middlewares de las rutas que requerían autenticación con el token generado por [Auth0](https://auth0.com/) con el fin de salvaguardar los datos de los usaurios y evitar ataques.
Se utilizó [Nodemailer](https://nodemailer.com/) para envíar los mails necesarios para notificar a los usuarios de sus distintas acciones con la página y también [Web-Push](https://www.npmjs.com/package/web-push) para generar las notificaciones y guardar las subscripciones en el modelo de usuario.

### Contacto
Te agradecemos por el interes en la página. Por cualquier duda o consulta podes escribirnos a service.mascotapp@gmai.com, o a nuestras redes personales que podes encontrar en el apartado [Team](https://mascotapps.vercel.app/team) de la página.
