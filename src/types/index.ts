// User and Role Types
export type UserRole = 'admin' | 'ceo' | 'gerente' | 'embajador' | 'cobrador';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  whatsapp?: string;
  avatar?: string;
  createdAt: Date;
}

// Embajador Types
export interface Embajador {
  id: string;
  userId: string;
  user: User;
  zona: string;
  ventasTotales: number;
  kpiSemanal: number;
  fechaRegistro: Date;
  leadsCount: number;
  leadsConvertidos: number;
}

// Proyecto Types
export interface Proyecto {
  id: string;
  nombre: string;
  zona: string;
  hectareas: number;
  estado: 'activo' | 'desarrollo' | 'vendido';
  inversiones: number;
  imagenes: string[];
  ubicacion: {
    lat: number;
    lng: number;
    direccion: string;
  };
  lotesDisponibles: number;
  lotesApartados: number;
  lotesVendidos: number;
  precioPromedio: number;
}

// Propiedad Types
export type EstatusPropiedad = 'disponible' | 'apartado' | 'vendido';

export interface Propiedad {
  id: string;
  proyectoId: string;
  proyecto?: Proyecto;
  lote: string;
  ubicacion: string;
  precio: number;
  medidas: string;
  estatus: EstatusPropiedad;
  imagenes: string[];
  tipoCasa?: string;
}

// Lead Types
export type EtapaPipeline = 
  | 'nuevo'
  | 'contactado'
  | 'calificado'
  | 'info_enviada'
  | 'seguimiento'
  | 'presentacion'
  | 'interesado'
  | 'apartado'
  | 'enganche_pagado'
  | 'contrato_firmado'
  | 'venta_cerrada'
  | 'postventa';

export const ETAPAS_PIPELINE: { value: EtapaPipeline; label: string; color: string }[] = [
  { value: 'nuevo', label: 'Nuevo', color: 'bg-blue-500' },
  { value: 'contactado', label: 'Contactado', color: 'bg-cyan-500' },
  { value: 'calificado', label: 'Calificado', color: 'bg-teal-500' },
  { value: 'info_enviada', label: 'Info Enviada', color: 'bg-green-500' },
  { value: 'seguimiento', label: 'Seguimiento', color: 'bg-yellow-500' },
  { value: 'presentacion', label: 'Presentación', color: 'bg-orange-500' },
  { value: 'interesado', label: 'Interesado', color: 'bg-purple-500' },
  { value: 'apartado', label: 'Apartado', color: 'bg-violet-500' },
  { value: 'enganche_pagado', label: 'Enganche Pagado', color: 'bg-pink-500' },
  { value: 'contrato_firmado', label: 'Contrato Firmado', color: 'bg-rose-500' },
  { value: 'venta_cerrada', label: 'Venta Cerrada', color: 'bg-emerald-600' },
  { value: 'postventa', label: 'Postventa', color: 'bg-gray-500' },
];

export interface Lead {
  id: string;
  nombre: string;
  telefono: string;
  whatsapp: string;
  email?: string;
  ciudad?: string;
  origen: string;
  embajadorId?: string;
  embajador?: Embajador;
  proyectoId?: string;
  proyecto?: Proyecto;
  etapa: EtapaPipeline;
  presupuesto?: number;
  enganche?: number;
  planPagos?: number;
  probabilidadCierre: number;
  notas?: string;
  fechaContacto?: Date;
  fechaCreacion: Date;
  ultimaActividad?: Date;
}

// Pago Types
export type EstatusPago = 'pendiente' | 'al_corriente' | 'atrasado' | 'vencido';

export interface Pago {
  id: string;
  leadId: string;
  lead?: Lead;
  monto: number;
  fechaVencimiento: Date;
  fechaPago?: Date;
  estatus: EstatusPago;
  tipo: 'enganche' | 'mensualidad';
}

// Activity Types
export type TipoActividad = 'llamada' | 'whatsapp' | 'email' | 'nota' | 'visita';

export interface Activity {
  id: string;
  leadId: string;
  userId: string;
  user?: User;
  tipo: TipoActividad;
  resumen: string;
  fecha: Date;
}

// Dashboard KPI Types
export interface DashboardKPIs {
  ventasMes: number;
  ventasMesAnterior: number;
  leadsNuevos: number;
  leadsNuevosAnterior: number;
  tasaConversion: number;
  tasaConversionAnterior: number;
  roiProyectos: number;
  roiProyectosAnterior: number;
}

// Chart Data Types
export interface VentasPorMes {
  mes: string;
  ventas: number;
}

export interface LeadsPorEtapa {
  etapa: string;
  count: number;
  color: string;
}

export interface TopEmbajador {
  nombre: string;
  ventas: number;
  leads: number;
}

// Permissions
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ['*'],
  ceo: ['dashboard', 'embajadores', 'leads', 'propiedades', 'cobranza', 'chat', 'settings.users', 'settings.alerts', 'settings.branding'],
  gerente: ['dashboard', 'embajadores', 'leads', 'propiedades', 'cobranza.view'],
  embajador: ['dashboard.own', 'propiedades', 'leads.own'],
  cobrador: ['dashboard.cobranza', 'propiedades', 'cobranza'],
};

export function hasPermission(role: UserRole, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  if (permissions.includes('*')) return true;
  if (permissions.includes(permission)) return true;
  
  // Check wildcard permissions
  const parts = permission.split('.');
  for (let i = parts.length - 1; i > 0; i--) {
    const wildcardPerm = parts.slice(0, i).join('.') + '.*';
    if (permissions.includes(wildcardPerm)) return true;
  }
  
  return false;
}
