import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  DollarSign,
  Plus,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { 
  mockDashboardKPIs, 
  mockVentasPorMes, 
  mockLeadsPorEtapa,
  mockTopEmbajadores,
  mockLeads,
  mockPagos
} from '@/data/mockData';
import { ETAPAS_PIPELINE } from '@/types';
import { cn } from '@/lib/utils';

function KPICard({ 
  title, 
  value, 
  previousValue, 
  icon: Icon, 
  format = 'number' 
}: { 
  title: string; 
  value: number; 
  previousValue: number; 
  icon: React.ElementType;
  format?: 'number' | 'currency' | 'percent';
}) {
  const change = previousValue > 0 ? ((value - previousValue) / previousValue) * 100 : 0;
  const isPositive = change >= 0;

  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(val);
      case 'percent':
        return `${val}%`;
      default:
        return val.toLocaleString('es-MX');
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue(value)}</div>
        <div className={cn(
          "flex items-center gap-1 text-sm mt-1",
          isPositive ? "text-success" : "text-destructive"
        )}>
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span>{Math.abs(change).toFixed(1)}% vs mes anterior</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const kpis = mockDashboardKPIs;
  const pagosAtrasados = mockPagos.filter(p => p.estatus === 'atrasado' || p.estatus === 'vencido');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Resumen ejecutivo de tu operación inmobiliaria</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/leads">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Lead
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/propiedades">
              <Eye className="h-4 w-4 mr-2" />
              Ver Propiedades
            </Link>
          </Button>
        </div>
      </div>

      {/* Alert for pending payments */}
      {pagosAtrasados.length > 0 && (
        <Card className="border-warning bg-warning/5">
          <CardContent className="flex items-center gap-4 py-4">
            <div className="h-10 w-10 rounded-full bg-warning/20 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-warning" />
            </div>
            <div className="flex-1">
              <p className="font-medium">
                {pagosAtrasados.length} pago{pagosAtrasados.length > 1 ? 's' : ''} requiere{pagosAtrasados.length === 1 ? '' : 'n'} atención
              </p>
              <p className="text-sm text-muted-foreground">Revisa el módulo de cobranza para más detalles</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/cobranza">Ver Cobranza</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Ventas del Mes"
          value={kpis.ventasMes}
          previousValue={kpis.ventasMesAnterior}
          icon={DollarSign}
          format="currency"
        />
        <KPICard
          title="Leads Nuevos"
          value={kpis.leadsNuevos}
          previousValue={kpis.leadsNuevosAnterior}
          icon={Users}
        />
        <KPICard
          title="Tasa de Conversión"
          value={kpis.tasaConversion}
          previousValue={kpis.tasaConversionAnterior}
          icon={Target}
          format="percent"
        />
        <KPICard
          title="ROI Proyectos"
          value={kpis.roiProyectos}
          previousValue={kpis.roiProyectosAnterior}
          icon={TrendingUp}
          format="percent"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ventas por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockVentasPorMes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="mes" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [
                      new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value),
                      'Ventas'
                    ]}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ventas" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Leads por Etapa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockLeadsPorEtapa}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="count"
                    nameKey="etapa"
                    label={({ etapa, count }) => `${etapa}: ${count}`}
                    labelLine={false}
                  >
                    {mockLeadsPorEtapa.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number, name: string) => [value, name]}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Embajadores */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Embajadores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockTopEmbajadores} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                  <YAxis 
                    type="category"
                    dataKey="nombre" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    width={100}
                  />
                  <Tooltip 
                    formatter={(value: number) => [
                      new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value),
                      'Ventas'
                    ]}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar 
                    dataKey="ventas" 
                    fill="hsl(var(--primary))" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Leads Recientes</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/leads">Ver todos</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Etapa</TableHead>
                  <TableHead className="text-right">Prob.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLeads.slice(0, 5).map((lead) => {
                  const etapa = ETAPAS_PIPELINE.find(e => e.value === lead.etapa);
                  return (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.nombre}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn("text-xs", etapa?.color, "text-white")}>
                          {etapa?.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{lead.probabilidadCierre}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
