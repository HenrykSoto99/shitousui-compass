

# 🏠 CRM Inmobiliario Shitoushui - Plan de Implementación

## Visión General
Sistema de gestión inmobiliaria completo con dashboard ejecutivo, CRM de leads con pipeline de 12 etapas, gestión de embajadores, control de cobranza, y asistente IA. Diseñado para 5 roles de usuario con permisos diferenciados.

---

## 🎨 Diseño y Branding

**Paleta de colores:**
- Naranja principal: #DA6426
- Gris oscuro: #3F3F3F  
- Gris claro: #A2A2A2
- Blanco: #FFFFFF

**Tipografía:** Inter (sans-serif)
**Estilo:** Moderno, cards limpios, tablas responsive, mobile-first
**Modos:** Dark/Light mode con toggle

---

## 🔐 Sistema de Autenticación y Roles

### Pantalla de Login
- Autenticación con Email/Password
- Login con Google OAuth
- Recuperación de contraseña
- Logo Shitoushui prominente

### 5 Niveles de Acceso:
1. **Admin (AgenciaIA)** - Acceso total incluyendo configuraciones
2. **CEO** - Acceso total excepto API keys
3. **Gerente** - Propiedades, reportes, embajadores
4. **Embajador** - Solo propiedades e información de ventas propias
5. **Cobrador** - Inventario, dashboard ventas, reportes de cobranza

---

## 📊 Pantalla 1: Dashboard Principal

### KPIs en Cards (4 métricas principales):
- 💰 Ventas del Mes (con % de cambio)
- 👥 Leads Nuevos
- 📈 Tasa de Conversión Pipeline
- 💎 ROI de Proyectos

### Visualizaciones:
- Gráfico de líneas: Ventas por mes
- Gráfico de dona: Leads por etapa del pipeline
- Gráfico de barras: Top Embajadores
- Tabla: Leads recientes con acciones rápidas

### Accesos rápidos:
- Botón "Nuevo Lead"
- Botón "Ver Propiedades"
- Alertas de cobranza pendiente

---

## 👥 Pantalla 2: Gestión de Embajadores

### Vista de Directorio:
Fichas estilo tarjeta bibliográfica con:
- Foto/Avatar del embajador
- Nombre completo + Zona asignada
- Total de ventas ($)
- KPI semanal con indicador visual
- Fecha de registro
- Botón "Ver sus Leads"

### Funcionalidades:
- Modal de registro self-service para nuevos embajadores
- Seguimiento detallado por lead
- Historial de comentarios por visita/llamada
- Métricas de rendimiento individual

---

## 📋 Pantalla 3: CRM de Leads

### Pipeline de 12 Etapas (Drag & Drop):
1. Nuevo → 2. Contactado → 3. Calificado → 4. Info Enviada → 5. Seguimiento → 6. Presentación → 7. Interesado → 8. Apartado → 9. Enganche Pagado → 10. Contrato Firmado → 11. Venta Cerrada → 12. Postventa

### Tabla de Leads con:
- Filtros: Etapa, Embajador, Proyecto, Rango de fechas
- Columnas: Nombre, Teléfono, Etapa, Probabilidad %, Última Actividad
- Acciones: Ver detalle, Editar, Agregar nota, Mover etapa

### Modal/Formulario Nuevo Lead:
- Datos de contacto (nombre, teléfono, WhatsApp, email)
- Ciudad de origen
- Presupuesto estimado
- Proyecto de interés
- Embajador asignado
- Plan de pagos preferido

### Timeline de Actividades:
- Registro de llamadas, WhatsApp, emails, notas
- Resumen de cada interacción
- Usuario que registró la actividad

---

## 🏡 Pantalla 4: Inventario de Propiedades

### Vista por Proyectos (Cards):
- Carrusel de imágenes del proyecto
- Nombre del desarrollo
- Ubicación con widget de Google Maps
- Hectáreas totales
- Contador: Lotes disponibles/apartados/vendidos
- Precio promedio por lote
- Estado del proyecto

### Detalle de Lotes:
- Número de lote
- Medidas exactas
- Precio
- Estatus (Disponible/Apartado/Vendido)
- Galería de imágenes
- Botón "Cotizar" (genera cotización)

### Información de Tipos de Casas:
- En la Selva: Casa Tipo C, Loft, Elevada, Celosía
- En la Montaña: Casa Gruta, Cuarzo
- Frente al Mar: Casa Yuum'Ha
- En el Bosque: Casa Triangular
- Casas Prefabricadas: Desierto, Montaña
- Construcciones Únicas

---

## 💳 Pantalla 5: Módulo de Cobranza

### Semáforo Visual de Estados:
- 🔴 **Vencidos** (contador) - Más de 30 días
- 🟡 **Atrasados** (contador) - 1-30 días
- 🟢 **Al Corriente** (contador) - Sin atrasos

### Tabla de Pagos:
- Cliente (con link a lead)
- Monto pendiente
- Días de atraso
- Fecha próximo pago
- Tipo de pago (Enganche/Mensualidad)
- Botón "Enviar Recordatorio"

### Funcionalidades:
- Filtros por estatus, proyecto, embajador
- Exportar lista de morosos
- Calendario de pagos programados
- Historial de pagos por cliente

---

## 🤖 Pantalla 6: Chat con IA

### Interfaz de Conversación:
Chatbot inteligente que responde a comandos como:
- "Reporte de ventas Querétaro"
- "Cotización lote X con 20% de enganche"
- "Leads prioritarios esta semana"
- "Métricas de embajador Juan Pérez"
- "Propiedades disponibles en zona selva"

### Capacidades IA (preparado para OpenAI):
- Generación de reportes en PDF
- Clasificación automática de leads (0-100% probabilidad)
- Cálculo de cotizaciones personalizadas
- Resúmenes ejecutivos

---

## 📱 Botón WhatsApp Soporte

### Posiciones (siempre visible):
- Fijo en esquina inferior derecha
- Animación "pulse" suave para llamar atención

### Funcionalidad:
- Click abre WhatsApp con mensaje pre-llenado
- Incluye página actual en el mensaje
- Tracking de clicks (preparado para n8n)

### Mensaje automático:
```
*Hola Ventas Shitousui*
Pantalla: [nombre-pantalla]
Tengo una duda de ventas
```

---

## ⚙️ Pantalla de Configuración (Solo Admin/CEO)

### Secciones:
- **Integraciones**: Espacios para conectar Supabase, OpenAI, Twilio, n8n
- **Gestión de Usuarios**: Crear/editar usuarios, asignar roles
- **Configuración de Alertas**: Días para recordatorios de pago
- **Personalización**: Subir logo, editar textos

---

## 📊 Navegación Lateral (Sidebar)

Con logo Shitoushui y links a:
- 🏠 Dashboard
- 👥 Embajadores
- 📋 Leads/CRM
- 🏡 Propiedades
- 💳 Cobranza
- 🤖 Chat IA
- ⚙️ Configuración (según rol)

### Footer del Sidebar:
- Información de usuario activo
- Rol actual
- Botón cerrar sesión

---

## 🔗 Preparación para Integraciones

### Supabase (Base de Datos + Auth):
- Estructura de tablas lista para migrar
- Políticas RLS preparadas por rol
- Triggers para automatizaciones

### OpenAI:
- Edge functions preparadas para chat
- Prompts configurables

### Twilio/WhatsApp:
- Endpoints para envío de notificaciones
- Templates de mensajes para recordatorios

### n8n:
- Webhooks configurados para tracking
- Workflows de automatización

---

## 📱 Responsive Design

- **Desktop**: Layout completo con sidebar
- **Tablet**: Sidebar colapsable
- **Mobile**: Navegación inferior, cards apiladas

---

## 📝 Contenido Institucional Incluido

Textos de Shitoushui visibles para embajadores:
> "Constructora Shitoushui - Empresa 100% mexicana comprometida con el cliente. Creamos espacios personalizados desde casas en el desierto hasta cabañas en bosques fríos, edificios frente al mar y más."

Links a redes sociales: Instagram, Facebook, TikTok, Threads

