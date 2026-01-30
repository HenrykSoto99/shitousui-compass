import { useState } from 'react';
import { 
  Search, 
  Plus, 
  MapPin, 
  TrendingUp,
  Users,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { mockEmbajadores } from '@/data/mockData';
import { cn } from '@/lib/utils';

function EmbajadorCard({ embajador }: { embajador: typeof mockEmbajadores[0] }) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getKPIColor = (kpi: number) => {
    if (kpi >= 80) return 'text-success';
    if (kpi >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const conversionRate = embajador.leadsCount > 0 
    ? ((embajador.leadsConvertidos / embajador.leadsCount) * 100).toFixed(1) 
    : '0';

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {getInitials(embajador.user.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-lg truncate">{embajador.user.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {embajador.zona}
                </div>
              </div>
              <Badge variant="secondary" className={cn("shrink-0", getKPIColor(embajador.kpiSemanal))}>
                KPI: {embajador.kpiSemanal}
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Ventas Totales</p>
                <p className="font-semibold text-primary">
                  {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(embajador.ventasTotales)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Leads</p>
                <p className="font-semibold">{embajador.leadsCount}</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">Conversión</span>
                <span className="font-medium">{conversionRate}%</span>
              </div>
              <Progress value={Number(conversionRate)} className="h-2" />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Desde {embajador.fechaRegistro.toLocaleDateString('es-MX', { month: 'short', year: 'numeric' })}
              </p>
              <Button variant="outline" size="sm">
                <Eye className="h-3 w-3 mr-1" />
                Ver Leads
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function NuevoEmbajadorModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Embajador
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Embajador</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre Completo</Label>
            <Input id="nombre" placeholder="Juan Pérez García" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="juan@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono / WhatsApp</Label>
            <Input id="telefono" placeholder="+52 998 123 4567" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zona">Zona Asignada</Label>
            <Input id="zona" placeholder="Cancún Centro" />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Registrar Embajador
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Embajadores() {
  const [search, setSearch] = useState('');

  const filteredEmbajadores = mockEmbajadores.filter(e =>
    e.user.name.toLowerCase().includes(search.toLowerCase()) ||
    e.zona.toLowerCase().includes(search.toLowerCase())
  );

  const totalVentas = mockEmbajadores.reduce((sum, e) => sum + e.ventasTotales, 0);
  const totalLeads = mockEmbajadores.reduce((sum, e) => sum + e.leadsCount, 0);
  const promedioKPI = mockEmbajadores.reduce((sum, e) => sum + e.kpiSemanal, 0) / mockEmbajadores.length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Embajadores</h1>
          <p className="text-muted-foreground">Gestiona tu equipo de ventas</p>
        </div>
        <NuevoEmbajadorModal />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockEmbajadores.length}</p>
              <p className="text-sm text-muted-foreground">Embajadores Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', notation: 'compact' }).format(totalVentas)}
              </p>
              <p className="text-sm text-muted-foreground">Ventas Totales</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{promedioKPI.toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">KPI Promedio</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar embajador..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredEmbajadores.map((embajador) => (
          <EmbajadorCard key={embajador.id} embajador={embajador} />
        ))}
      </div>

      {filteredEmbajadores.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No se encontraron embajadores</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
