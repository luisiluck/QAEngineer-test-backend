# QAEngineer-test-backend
# **Backend - Proyecto de Prueba**

Este proyecto es un backend básico desarrollado con **Node.js** y **Express**. Proporciona los endpoints necesarios para validar el flujo de autenticación, como inicio de sesión, obtención de perfil de usuario y cierre de sesión. El candidato deberá realizar pruebas e integraciones con el frontend.

---

## **Requisitos previos**

Antes de comenzar, asegúrate de tener instalados:

- **Node.js** (versión 16 o superior). Descárgalo desde [Node.js](https://nodejs.org/).
- **npm** (incluido con Node.js).

Para verificar si están instalados, ejecuta en tu terminal:

```bash
node -v
npm -v
```

---

## **1. Clonar el repositorio**

Clona este repositorio en tu máquina local:

```bash
git clone <URL_DEL_REPOSITORIO>
cd backend
```

---

## **2. Instalar dependencias**

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```

Esto instalará **Express**, **Cors** y otras dependencias necesarias para el proyecto.

---

## **3. Ejecutar el servidor**

Inicia el servidor en modo desarrollo usando **nodemon** (incluido en el proyecto):

```bash
npm run dev
```

Esto iniciará el servidor en `http://localhost:3001`. Deberías ver un mensaje como este en la consola:

```
Backend running on http://localhost:3001
```

Si prefieres iniciar el servidor sin nodemon, puedes usar:

```bash
npm start
```

---

## **4. Endpoints disponibles**

### **POST /login**
- **Descripción:** Autentica al usuario con credenciales válidas.
- **Body (JSON):**
  ```json
  {
    "email": "test@example.com",
    "password": "1234"
  }
  ```
- **Respuestas:**
  - **200 OK:**
    ```json
    {
      "token": "fake-jwt-token",
      "message": "Login successful!"
    }
    ```
  - **401 Unauthorized:**
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

---

### **GET /profile**
- **Descripción:** Retorna el perfil del usuario autenticado.
- **Headers:**
  ```json
  {
    "Authorization": "Bearer fake-jwt-token"
  }
  ```
- **Respuestas:**
  - **200 OK:**
    ```json
    {
      "name": "John Doe",
      "email": "test@example.com"
    }
    ```
  - **403 Forbidden:**
    ```json
    {
      "message": "Unauthorized"
    }
    ```

---

### **POST /logout**
- **Descripción:** Finaliza la sesión del usuario.
- **Respuestas:**
  - **200 OK:**
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

---

## **5. Scripts útiles**

- **Iniciar el servidor en modo desarrollo:**
  ```bash
  npm run dev
  ```

- **Iniciar el servidor en modo producción:**
  ```bash
  npm start
  ```

---

## **6. Notas adicionales**

1. **Configuración adicional:**
   - Este backend está diseñado para ejecutarse en `http://localhost:3001`. Si necesitas cambiar el puerto, modifica el archivo `app.js` en la línea:
     ```javascript
     const PORT = 3001;
     ```

2. **Simulación de autenticación:**
   - Las credenciales válidas están predefinidas como:
     - **Email:** `test@example.com`
     - **Password:** `1234`

3. **Errores comunes:**
   - Si no puedes conectar el frontend con el backend, verifica que ambos estén ejecutándose y que las URLs coincidan.

---

## **7. Siguientes pasos**

- **Probar los endpoints:** Puedes usar herramientas como Postman o cURL para probar manualmente los endpoints.
- **Escribir pruebas automatizadas:** Usa herramientas como Postman y Newman para diseñar y ejecutar pruebas automatizadas.

Si tienes preguntas o necesitas ayuda, contacta a tu responsable técnico.

---

## **8. Pruebas de API**
Las pruebas de API se realizan a partir de colecciones de Postman utilizando el CLI de Newman.
El proyecto consta de la siguiente estructura

```
/QAENGINEER-TEST_BACKEND
├── /tests
│   ├── /collections
│   │   └── backend.json    # colección de endpoints con sus pruebas
│   ├── /environments
│   │   └── local.json      # Configuración de entorno
│   └── /data
│       └── data.csv        # Datos de entrada para las pruebas
└── helpers
        └── waitAndTest.js  # verifica que el servidor este activo en el ambiente seleccionado, antes de ejecutar las pruebas
```

### Para ejecutar las pruebas:
1. asegúrate de haber instalado el proyecto
    ```bash
    npm install
    ```
2. Ejecuta el comando
    ```bash
    npm run test:local
    ```
    > **Nota**: Este comando se asegura de inicializar una instancia del Servidor para ser testeada.

### Personalización:
Si deseas utilizar diferentes colecciones, ambientes, o set de datos para las pruebas puedes utilizar el script de ***waitAndTest.js*** con los siguientes parámetros:

| Parámetro                | Opción en Línea de Comando          | Descripción                                                           | Valor Predeterminado  | Ejemplo de Uso                                |
|-------------------------|-------------------------------------|-----------------------------------------------------------------------|-----------------------|-----------------------------------------------|
| **Entorno**              | `-e, --environment <type>`         | El entorno del sistema bajo pruebas (por ejemplo: local, dev, prod)  | `local`               | `-e dev`                                      |
| **Colección**            | `-c, --collection <type>`          | La colección de pruebas que se ejecutará                             | `backend`             | `-c user-tests`                               |
| **Datos de Prueba**      | `-d, --data <type>`                | Los datos de entrada utilizados en las pruebas                       | `data`                | `-d test-data`                                |
| **Tiempo de Espera**     | `-w, --wait <number>`              | Tiempo máximo de espera para que el servidor esté listo (miliseg.)   | `15000` (15 segundos) | `-w 30000` (30 segundos)                      |
| **Intervalo de Reintento** | `-i, --interval <number>`        | Intervalo de tiempo entre cada verificación del servidor (miliseg.)  | `1000` (1 segundo)    | `-i 2000` (2 segundos)                        |

#### Ejemplo de ejecución completo:
```bash
node script.js -e local -c backend -d data -w 20000 -i 2000
```

#### Explicación de los Parámetros

- **`environment`**:  
  Este parámetro selecciona el entorno en el cual se ejecutarán las pruebas. Se refiere a los archivos de entorno definidos en la ruta `tests/environments/`.  
  - **Ejemplo:** `-e local` cargará la configuración desde `tests/environments/local.json`.

- **`collection`**:  
  Especifica la colección de pruebas de **Postman** que se ejecutará. Esta colección debe estar ubicada en la carpeta `tests/collections/`.  
  - **Ejemplo:** `-c backend` ejecutará la colección `tests/collections/backend.json`.

- **`data`**:  
  Define el archivo CSV que contiene los datos de entrada para ejecutar pruebas parametrizadas. El archivo debe estar ubicado en `tests/data/`.  
  - **Ejemplo:** `-d data` usará los datos de `tests/data/data.csv`.

- **`wait`**:  
  Establece el tiempo máximo que el script esperará a que el servidor esté listo antes de que ocurra un timeout. Este valor está en milisegundos.  
  - **Ejemplo:** `-w 20000` espera hasta 20 segundos.

- **`interval`**:  
  Define cuánto tiempo esperar entre cada verificación del estado del servidor. Este valor también está en milisegundos.  
  - **Ejemplo:** `-i 2000` realizará verificaciones cada 2 segundos.