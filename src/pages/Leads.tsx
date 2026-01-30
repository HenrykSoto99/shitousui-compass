import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter,
  Phone,
  Mail,
  MoreHorizontal,
  Edit,
  MessageSquare,
  Eye
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockLeads, mockProyectos, mockEmbajadores } from '@/data/mockData';
import { ETAPAS_PIPELINE, type Lead } from '@/types';
import { cn } from '@/lib/utils';

function NuevoLeadModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Lead</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 mt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre Completo *</Label>
              <Input id="nombre" placeholder="Juan Pérez García" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono *</Label>
              <Input id="telefono" placeholder="+52 55 1234 5678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input id="whatsapp" placeholder="+52 55 1234 5678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="juan@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ciudad">Ciudad de Origen</Label>
              <Input id="ciudad" placeholder="Ciudad de México" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="origen">Origen del Lead</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar origen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">Facebook Ads</SelectItem>
                  <SelectItem value="google">Google Ads</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="referido">Referido</SelectItem>
                  <SelectItem value="organico">Orgánico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="proyecto">Proyecto de Interés</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar proyecto" />
                </SelectTrigger>
                <SelectContent>
                  {mockProyectos.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="embajador">Embajador Asignado</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar embajador" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmbajadores.map(e => (
                    <SelectItem key={e.id} value={e.id}>{e.user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="presupuesto">Presupuesto Estimado</Label>
              <Input id="presupuesto" type="number" placeholder="1000000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="planPagos">Plan de Pagos (meses)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12 meses</SelectItem>
                  <SelectItem value="18">18 meses</SelectItem>
                  <SelectItem value="24">24 meses</SelectItem>
                  <SelectItem value="36">36 meses</SelectItem>
                  <SelectItem value="48">48 meses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notas">Notas Adicionales</Label>
            <Textarea id="notas" placeholder="Información adicional del lead..." rows={3} />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Crear Lead
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function LeadRow({ lead }: { lead: Lead }) {
  const etapa = ETAPAS_PIPELINE.find(e => e.value === lead.etapa);

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>
        <div>
          <p className="font-medium">{lead.nombre}</p>
          <p className="text-sm text-muted-foreground">{lead.ciudad || 'Sin ciudad'}</p>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-sm">
            <Phone className="h-3 w-3" />
            {lead.telefono}
          </div>
          {lead.email && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Mail className="h-3 w-3" />
              {lead.email}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="secondary" className={cn("text-xs", etapa?.color, "text-white")}>
          {etapa?.label}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="w-12 h-2 rounded-full bg-muted overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full",
                lead.probabilidadCierre >= 70 ? "bg-success" :
                lead.probabilidadCierre >= 40 ? "bg-warning" : "bg-destructive"
              )}
              style={{ width: `${lead.probabilidadCierre}%` }}
            />
          </div>
          <span className="text-sm font-medium">{lead.probabilidadCierre}%</span>
        </div>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {lead.ultimaActividad?.toLocaleDateString('es-MX', { 
          day: 'numeric', 
          month: 'short' 
        }) || 'Sin actividad'}
      </TableCell>
      <TableCell className="text-sm">
        {lead.embajador?.user.name || 'Sin asignar'}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              Ver Detalle
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="h-4 w-4 mr-2" />
              Agregar Nota
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default function Leads() {
  const [search, setSearch] = useState('');
  const [etapaFilter, setEtapaFilter] = useState<string>('all');
  const [embajadorFilter, setEmbajadorFilter] = useState<string>('all');

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.nombre.toLowerCase().includes(search.toLowerCase()) ||
      lead.telefono.includes(search) ||
      lead.email?.toLowerCase().includes(search.toLowerCase());
    
    const matchesEtapa = etapaFilter === 'all' || lead.etapa === etapaFilter;
    const matchesEmbajador = embajadorFilter === 'all' || lead.embajadorId === embajadorFilter;

    return matchesSearch && matchesEtapa && matchesEmbajador;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Leads / CRM</h1>
          <p className="text-muted-foreground">Gestiona tu pipeline de ventas</p>
        </div>
        <NuevoLeadModal />
      </div>

      {/* Pipeline Summary */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {ETAPAS_PIPELINE.map(etapa => {
          const count = mockLeads.filter(l => l.etapa === etapa.value).length;
          return (
            <Button
              key={etapa.value}
              variant={etapaFilter === etapa.value ? "default" : "outline"}
              size="sm"
              className="shrink-0"
              onClick={() => setEtapaFilter(etapaFilter === etapa.value ? 'all' : etapa.value)}
            >
              <span className={cn("w-2 h-2 rounded-full mr-2", etapa.color)} />
              {etapa.label}
              <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                {count}
              </Badge>
            </Button>
          );
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar lead..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={embajadorFilter} onValueChange={setEmbajadorFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Todos los embajadores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los embajadores</SelectItem>
                {mockEmbajadores.map(e => (
                  <SelectItem key={e.id} value={e.id}>{e.user.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(etapaFilter !== 'all' || embajadorFilter !== 'all' || search) && (
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSearch('');
                  setEtapaFilter('all');
                  setEmbajadorFilter('all');
                }}
              >
                Limpiar filtros
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Etapa</TableHead>
                <TableHead>Probabilidad</TableHead>
                <TableHead>Última Act.</TableHead>
                <TableHead>Embajador</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map(lead => (
                <LeadRow key={lead.id} lead={lead} />
              ))}
            </TableBody>
          </Table>

          {filteredLeads.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Filter className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No se encontraron leads</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
