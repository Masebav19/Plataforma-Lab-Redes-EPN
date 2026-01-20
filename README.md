 Para que la plataforma pueda funcionar se debe isntalar una base de datos en mysql, crear un .env con las variables de entorno DATABASE_URL, SERVER_PORT y EMAIL_PASSWORD
 Para arrancar todos los servicios por primera vez, se debe correr el siguiente comando en cli "npx prisma migrate dev --name init"
