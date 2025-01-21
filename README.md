# Aplicación Financiera

## Descripción General

Este proyecto implementa una simulación de un sistema bancario moderno con arquitectura de microservicios. Se enfoca en cuentas de ahorro con características como redondeo de transacciones e inversión automática a fondos simulados. Incentiva el hábito del ahorro y cumple tus metas.

## Arquitectura

### Componentes Backend

El backend está construido usando NestJS y consta de dos microservicios principales:

1. **Servicio de Autenticación**

- Implementa simulación de autenticación OAuth2
- Gestiona la autenticación y autorización de usuarios
- Administra la generación y validación de tokens

2. **Servicio Bancario**

- Implementación de la lógica bancaria central
- Gestión de cuentas de inversión
- Implementa funcionalidad de redondeo para transacciones
- Administra metas de ahorro y proyecciones
- Integración con MongoDB para persistencia de datos

### Componentes Frontend

Construido con Next.js, React y TypeScript, incluye:

- Integración de autenticación OAuth2
- Gestión de sesiones con expiración automática de tokens
- Navegación SPA (Single Page Application)
- Diseño responsive con Tailwind CSS
- Componentes UI reutilizables

## Características Implementadas

### Backend

- ✅ Operaciones CRUD completas para productos bancarios
- ✅ Simulación de autenticación OAuth2
- ✅ Integración con MongoDB
- ✅ Arquitectura de microservicios
- ✅ Containerización con Docker

### Frontend

- ✅ Interfaz de Billetera completamente funcional
- ✅ Sección de inversiones con proyecciones estáticas
- ✅ Dashboard dinámico
- ✅ Simulación de transacciones (depósitos y compras)
- ✅ Manejo de expiración de tokens
- ✅ Diseño responsive
- ✅ Containerización con Docker

## Áreas de Mejora

### Seguridad

- Implementación de encriptación de información sensible en tránsito y reposo
- Encriptación de datos en las comunicaciones entre servicios
- Fortalecimiento de la seguridad en el almacenamiento de datos

### Backend

- Manejo mejorado de errores y excepciones
- Implementación de pruebas unitarias
- Refinamiento de respuestas API

### Frontend

- Sistema de alertas personalizado para reemplazar las alertas nativas
- Implementación de interfaz de metas
- Proyecciones dinámicas de inversión
- Implementación de pruebas unitarias

## Instalación y Configuración

### Requisitos Previos

- Docker y Docker Compose

### Configuración del Entorno y Despliegue

1. **Preparación de Archivos de Entorno**

- Extraer y colocar los archivos `.env` correspondientes en cada microservicio:
  - `.env` para Auth Service (puerto 3001)  auth-service/.env
  - `.env` para Bank Service (puerto 3002) bank-service/.env

2. **Verificación de Puertos**

- Asegurarse de que los siguientes puertos estén disponibles:
  - 3000 (Frontend)
  - 3001 (Auth Service)
  - 3002 (Bank Service)

3. **Iniciar la Aplicación**

```bash
# Iniciar todos los servicios
docker-compose up
```

4.  **Acceder a la Aplicación**
    Navegar a `http://localhost:3000/login` en el navegador
    Esta es la página de inicio de la aplicación

5. **Simulacion 2Aouth:**
   Para obtener el **codigo de verificacion de 6 digitos** en el log del contenedor de **auth-service**, alli lo va a encontrar, se espera que en una implementacion real se envie por SMS o correo electronico pero para efectos de la simulacion y de tiempo se dejo de        esta manera

6. **Simulacion Depositos y compras:**
   En la pantalla de billetera,  abajo a la derecha hay 2 botones, uno verde y uno rojo con estos son para simular depoitos y compras respectivamente, importante para ver redondeos, ir a la pantalla inversiones, active el redondeo y guarde la infromacion, de esta manera al generar las compras podria ver alli el funcionamiento de lo redondeos e inversiones.

### Notas Importantes

1. **Sobre Test Unitarios**:
   Debido a limitaciones de tiempo en el desarrollo del proyecto, las pruebas unitarias tanto en el frontend como en el backend no fueron implementadas.


