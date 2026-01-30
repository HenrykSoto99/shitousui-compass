import { useState } from 'react';
import { 
  Search, 
  MapPin,
  Home,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { mockProyectos, mockPropiedades } from '@/data/mockData';
import type { Proyecto, Propiedad } from '@/types';
import { cn } from '@/lib/utils';

function ProyectoCard({ proyecto }: { proyecto: Proyecto }) {
  const [currentImage, setCurrentImage] = useState(0);

  const totalLotes = proyecto.lotesDisponibles + proyecto.lotesApartados + proyecto.lotesVendidos;

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activo': return 'bg-success text-success-foreground';
      case 'desarrollo': return 'bg-warning text-warning-foreground';
      case 'vendido': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Carousel */}
      <div className="relative aspect-video bg-muted">
        <img 
          src={proyecto.imagenes[currentImage] || '/placeholder.svg'} 
          alt={proyecto.nombre}
          className="w-full h-full object-cover"
        />
        {proyecto.imagenes.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 h-8 w-8"
              onClick={() => setCurrentImage(prev => prev === 0 ? proyecto.imagenes.length - 1 : prev - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 h-8 w-8"
              onClick={() => setCurrentImage(prev => prev === proyecto.imagenes.length - 1 ? 0 : prev + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
        <Badge className={cn("absolute top-3 right-3", getEstadoColor(proyecto.estado))}>
          {proyecto.estado.charAt(0).toUpperCase() + proyecto.estado.slice(1)}
        </Badge>
      </div>

      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-semibold text-lg">{proyecto.nombre}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {proyecto.zona}
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-primary">
              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(proyecto.precioPromedio)}
            </p>
            <p className="text-xs text-muted-foreground">precio promedio</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Home className="h-4 w-4" />
          <span>{proyecto.hectareas} hectáreas</span>
        </div>

        {/* Lotes status */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 rounded-lg bg-success/10">
            <p className="text-lg font-bold text-success">{proyecto.lotesDisponibles}</p>
            <p className="text-xs text-muted-foreground">Disponibles</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-warning/10">
            <p className="text-lg font-bold text-warning">{proyecto.lotesApartados}</p>
            <p className="text-xs text-muted-foreground">Apartados</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-muted">
            <p className="text-lg font-bold">{proyecto.lotesVendidos}</p>
            <p className="text-xs text-muted-foreground">Vendidos</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-2 rounded-full bg-muted overflow-hidden flex">
            <div 
              className="bg-success" 
              style={{ width: `${(proyecto.lotesDisponibles / totalLotes) * 100}%` }}
            />
            <div 
              className="bg-warning" 
              style={{ width: `${(proyecto.lotesApartados / totalLotes) * 100}%` }}
            />
            <div 
              className="bg-muted-foreground" 
              style={{ width: `${(proyecto.lotesVendidos / totalLotes) * 100}%` }}
            />
          </div>
        </div>

        <Button variant="outline" className="w-full">
          <Eye className="h-4 w-4 mr-2" />
          Ver Lotes
        </Button>
      </CardContent>
    </Card>
  );
}

function LoteCard({ propiedad }: { propiedad: Propiedad }) {
  const getEstatusColor = (estatus: string) => {
    switch (estatus) {
      case 'disponible': return 'bg-success text-success-foreground';
      case 'apartado': return 'bg-warning text-warning-foreground';
      case 'vendido': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h4 className="font-semibold">Lote {propiedad.lote}</h4>
            <p className="text-sm text-muted-foreground">{propiedad.ubicacion}</p>
          </div>
          <Badge className={getEstatusColor(propiedad.estatus)}>
            {propiedad.estatus.charAt(0).toUpperCase() + propiedad.estatus.slice(1)}
          </Badge>
        </div>

        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Medidas:</span>
            <span className="font-medium">{propiedad.medidas}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Precio:</span>
            <span className="font-bold text-primary">
              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(propiedad.precio)}
            </span>
          </div>
          {propiedad.tipoCasa && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tipo de Casa:</span>
              <span>{propiedad.tipoCasa}</span>
            </div>
          )}
        </div>

        {propiedad.estatus === 'disponible' && (
          <Button size="sm" className="w-full">
            Cotizar
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function TiposCasasInfo() {
  const tiposCasas = [
    {
      categoria: 'En la Selva',
      tipos: ['Casa Tipo C', 'Casa Loft', 'Casa Elevada', 'Casa Celosía'],
    },
    {
      categoria: 'En la Montaña',
      tipos: ['Casa Gruta', 'Casa Cuarzo'],
    },
    {
      categoria: 'Frente al Mar',
      tipos: ["Casa Yuum'Ha"],
    },
    {
      categoria: 'En el Bosque',
      tipos: ['Casa Triangular'],
    },
    {
      categoria: 'Casas Prefabricadas',
      tipos: ['En el Desierto', 'En la Montaña'],
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Home className="h-4 w-4 mr-2" />
          Tipos de Casas
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Catálogo de Tipos de Casas</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2 mt-4">
          {tiposCasas.map(cat => (
            <Card key={cat.categoria}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{cat.categoria}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {cat.tipos.map(tipo => (
                    <li key={tipo} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {tipo}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="mt-4 bg-muted/50">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Constructora Shitoushui</strong> - Empresa 100% mexicana comprometida con el cliente. 
              Creamos espacios personalizados para cada tipo de gusto: desde casas en el desierto hasta 
              cabañas en bosques fríos, edificios frente al mar y más.
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default function Propiedades() {
  const [search, setSearch] = useState('');
  const [zonaFilter, setZonaFilter] = useState<string>('all');
  const [view, setView] = useState<'proyectos' | 'lotes'>('proyectos');

  const zonas = [...new Set(mockProyectos.map(p => p.zona))];

  const filteredProyectos = mockProyectos.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(search.toLowerCase());
    const matchesZona = zonaFilter === 'all' || p.zona === zonaFilter;
    return matchesSearch && matchesZona;
  });

  const filteredPropiedades = mockPropiedades.filter(p => {
    const proyecto = mockProyectos.find(pr => pr.id === p.proyectoId);
    const matchesSearch = p.lote.toLowerCase().includes(search.toLowerCase()) ||
      proyecto?.nombre.toLowerCase().includes(search.toLowerCase());
    const matchesZona = zonaFilter === 'all' || proyecto?.zona === zonaFilter;
    return matchesSearch && matchesZona;
  });

  // Stats
  const totalDisponibles = mockProyectos.reduce((sum, p) => sum + p.lotesDisponibles, 0);
  const totalApartados = mockProyectos.reduce((sum, p) => sum + p.lotesApartados, 0);
  const totalVendidos = mockProyectos.reduce((sum, p) => sum + p.lotesVendidos, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Propiedades</h1>
          <p className="text-muted-foreground">Inventario de proyectos y lotes</p>
        </div>
        <TiposCasasInfo />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockProyectos.length}</p>
              <p className="text-sm text-muted-foreground">Proyectos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
              <Home className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalDisponibles}</p>
              <p className="text-sm text-muted-foreground">Disponibles</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
              <Home className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalApartados}</p>
              <p className="text-sm text-muted-foreground">Apartados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
              <Home className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalVendidos}</p>
              <p className="text-sm text-muted-foreground">Vendidos</p>
            </div>
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
                placeholder="Buscar proyecto o lote..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={zonaFilter} onValueChange={setZonaFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Todas las zonas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las zonas</SelectItem>
                {zonas.map(zona => (
                  <SelectItem key={zona} value={zona}>{zona}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-1 p-1 bg-muted rounded-lg">
              <Button
                variant={view === 'proyectos' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('proyectos')}
              >
                Proyectos
              </Button>
              <Button
                variant={view === 'lotes' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('lotes')}
              >
                Lotes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {view === 'proyectos' ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProyectos.map(proyecto => (
            <ProyectoCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPropiedades.map(propiedad => (
            <LoteCard key={propiedad.id} propiedad={propiedad} />
          ))}
        </div>
      )}

      {((view === 'proyectos' && filteredProyectos.length === 0) || 
        (view === 'lotes' && filteredPropiedades.length === 0)) && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Home className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No se encontraron resultados</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
