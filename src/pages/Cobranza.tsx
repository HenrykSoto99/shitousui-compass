import { useState } from 'react';
import { 
  Search, 
  Bell,
  Download,
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockPagos } from '@/data/mockData';
import type { Pago } from '@/types';
import { cn } from '@/lib/utils';

function SemaforoCard({ 
  title, 
  count, 
  icon: Icon, 
  color 
}: { 
  title: string; 
  count: number; 
  icon: React.ElementType;
  color: 'destructive' | 'warning' | 'success';
}) {
  const colorClasses = {
    destructive: 'bg-destructive/10 text-destructive',
    warning: 'bg-warning/10 text-warning',
    success: 'bg-success/10 text-success',
  };

  const ringClasses = {
    destructive: 'ring-destructive/20',
    warning: 'ring-warning/20',
    success: 'ring-success/20',
  };

  return (
    <Card className={cn("ring-2", ringClasses[color])}>
      <CardContent className="flex items-center gap-4 py-6">
        <div className={cn("h-14 w-14 rounded-full flex items-center justify-center", colorClasses[color])}>
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-3xl font-bold">{count}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function getDiasAtraso(fechaVencimiento: Date): number {
  const today = new Date();
  const diffTime = today.getTime() - fechaVencimiento.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

function PagoRow({ pago }: { pago: Pago }) {
  const diasAtraso = getDiasAtraso(pago.fechaVencimiento);

  const getEstatusConfig = (estatus: string) => {
    switch (estatus) {
      case 'vencido':
        return { 
          label: 'Vencido', 
          color: 'bg-destructive text-destructive-foreground',
          icon: AlertCircle
        };
      case 'atrasado':
        return { 
          label: 'Atrasado', 
          color: 'bg-warning text-warning-foreground',
          icon: Clock
        };
      case 'al_corriente':
        return { 
          label: 'Al Corriente', 
          color: 'bg-success text-success-foreground',
          icon: CheckCircle2
        };
      default:
        return { 
          label: 'Pendiente', 
          color: 'bg-muted text-muted-foreground',
          icon: Clock
        };
    }
  };

  const estatusConfig = getEstatusConfig(pago.estatus);
  const StatusIcon = estatusConfig.icon;

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>
        <div>
          <p className="font-medium">{pago.lead?.nombre || 'Sin asignar'}</p>
          <p className="text-sm text-muted-foreground">{pago.lead?.telefono}</p>
        </div>
      </TableCell>
      <TableCell>
        <span className="font-semibold text-primary">
          {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(pago.monto)}
        </span>
      </TableCell>
      <TableCell>
        {diasAtraso > 0 ? (
          <span className={cn(
            "font-medium",
            diasAtraso > 30 ? "text-destructive" : "text-warning"
          )}>
            {diasAtraso} días
          </span>
        ) : (
          <span className="text-muted-foreground">-</span>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {pago.fechaVencimiento.toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {pago.tipo}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge className={cn("flex items-center gap-1 w-fit", estatusConfig.color)}>
          <StatusIcon className="h-3 w-3" />
          {estatusConfig.label}
        </Badge>
      </TableCell>
      <TableCell>
        {(pago.estatus === 'atrasado' || pago.estatus === 'vencido') && (
          <Button size="sm" variant="outline">
            <Bell className="h-3 w-3 mr-1" />
            Recordatorio
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

export default function Cobranza() {
  const [search, setSearch] = useState('');
  const [estatusFilter, setEstatusFilter] = useState<string>('all');

  const filteredPagos = mockPagos.filter(pago => {
    const matchesSearch = pago.lead?.nombre.toLowerCase().includes(search.toLowerCase()) || false;
    const matchesEstatus = estatusFilter === 'all' || pago.estatus === estatusFilter;
    return matchesSearch && matchesEstatus;
  });

  const vencidos = mockPagos.filter(p => p.estatus === 'vencido').length;
  const atrasados = mockPagos.filter(p => p.estatus === 'atrasado').length;
  const alCorriente = mockPagos.filter(p => p.estatus === 'al_corriente' || p.estatus === 'pendiente').length;

  const montoVencidos = mockPagos
    .filter(p => p.estatus === 'vencido')
    .reduce((sum, p) => sum + p.monto, 0);
  
  const montoAtrasados = mockPagos
    .filter(p => p.estatus === 'atrasado')
    .reduce((sum, p) => sum + p.monto, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Cobranza</h1>
          <p className="text-muted-foreground">Control de pagos y recordatorios</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar Morosos
        </Button>
      </div>

      {/* Semáforo */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SemaforoCard
          title="Vencidos (+30 días)"
          count={vencidos}
          icon={AlertCircle}
          color="destructive"
        />
        <SemaforoCard
          title="Atrasados (1-30 días)"
          count={atrasados}
          icon={Clock}
          color="warning"
        />
        <SemaforoCard
          title="Al Corriente"
          count={alCorriente}
          icon={CheckCircle2}
          color="success"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-destructive/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-muted-foreground">Monto Vencido</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">
              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(montoVencidos)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-warning/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-muted-foreground">Monto Atrasado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-warning">
              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(montoAtrasados)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cliente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={estatusFilter} onValueChange={setEstatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Todos los estatus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estatus</SelectItem>
                <SelectItem value="vencido">Vencidos</SelectItem>
                <SelectItem value="atrasado">Atrasados</SelectItem>
                <SelectItem value="al_corriente">Al Corriente</SelectItem>
                <SelectItem value="pendiente">Pendientes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Días Atraso</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estatus</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPagos.map(pago => (
                <PagoRow key={pago.id} pago={pago} />
              ))}
            </TableBody>
          </Table>

          {filteredPagos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <CheckCircle2 className="h-12 w-12 text-success mb-4" />
              <p className="text-muted-foreground">No hay pagos pendientes</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
