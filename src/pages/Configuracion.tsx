import { 
  Database, 
  Key, 
  MessageSquare, 
  Bell,
  Users,
  Palette,
  ExternalLink,
  Check,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockUsers } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  status: 'connected' | 'disconnected' | 'pending';
  onConnect: () => void;
}

function IntegrationCard({ title, description, icon: Icon, status, onConnect }: IntegrationCardProps) {
  const statusConfig = {
    connected: { label: 'Conectado', color: 'bg-success', icon: Check },
    disconnected: { label: 'No conectado', color: 'bg-muted', icon: AlertCircle },
    pending: { label: 'Pendiente', color: 'bg-warning', icon: AlertCircle },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{title}</h3>
              <Badge variant="secondary" className={cn("text-xs", config.color, status === 'connected' && "text-success-foreground")}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {config.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            <Button 
              variant={status === 'connected' ? 'outline' : 'default'} 
              size="sm"
              onClick={onConnect}
            >
              {status === 'connected' ? 'Configurar' : 'Conectar'}
              <ExternalLink className="h-3 w-3 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Configuracion() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">Administra las integraciones y preferencias del sistema</p>
      </div>

      <Tabs defaultValue="integraciones" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
          <TabsTrigger value="integraciones">Integraciones</TabsTrigger>
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="alertas">Alertas</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        {/* Integraciones Tab */}
        <TabsContent value="integraciones" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <IntegrationCard
              title="Supabase"
              description="Base de datos PostgreSQL, autenticación y almacenamiento de archivos."
              icon={Database}
              status="disconnected"
              onConnect={() => console.log('Connect Supabase')}
            />
            <IntegrationCard
              title="OpenAI"
              description="Potencia el chat IA con GPT-4 para reportes y análisis inteligentes."
              icon={Key}
              status="disconnected"
              onConnect={() => console.log('Connect OpenAI')}
            />
            <IntegrationCard
              title="Twilio / WhatsApp"
              description="Envía notificaciones y recordatorios por WhatsApp Business API."
              icon={MessageSquare}
              status="disconnected"
              onConnect={() => console.log('Connect Twilio')}
            />
            <IntegrationCard
              title="n8n"
              description="Automatiza workflows y conecta con cientos de servicios externos."
              icon={Bell}
              status="disconnected"
              onConnect={() => console.log('Connect n8n')}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Claves de API</CardTitle>
              <CardDescription>Configura las credenciales para las integraciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="supabase-url">Supabase URL</Label>
                  <Input id="supabase-url" placeholder="https://xxxx.supabase.co" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supabase-key">Supabase Anon Key</Label>
                  <Input id="supabase-key" type="password" placeholder="eyJ..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="openai-key">OpenAI API Key</Label>
                  <Input id="openai-key" type="password" placeholder="sk-..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twilio-sid">Twilio Account SID</Label>
                  <Input id="twilio-sid" type="password" placeholder="AC..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="n8n-webhook">n8n Webhook URL</Label>
                  <Input id="n8n-webhook" placeholder="https://n8n.example.com/webhook/..." />
                </div>
              </div>
              <Button className="mt-4">Guardar Credenciales</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usuarios Tab */}
        <TabsContent value="usuarios" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Gestión de Usuarios</CardTitle>
                <CardDescription>Administra los usuarios y sus roles</CardDescription>
              </div>
              <Button>
                <Users className="h-4 w-4 mr-2" />
                Nuevo Usuario
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUsers.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Select defaultValue={user.role}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="ceo">CEO</SelectItem>
                          <SelectItem value="gerente">Gerente</SelectItem>
                          <SelectItem value="embajador">Embajador</SelectItem>
                          <SelectItem value="cobrador">Cobrador</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alertas Tab */}
        <TabsContent value="alertas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configuración de Alertas</CardTitle>
              <CardDescription>Define cuándo enviar recordatorios automáticos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Recordatorios de Pago</h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">3 días antes</p>
                      <p className="text-sm text-muted-foreground">Recordatorio temprano</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">7 días antes</p>
                      <p className="text-sm text-muted-foreground">Recordatorio estándar</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">15 días antes</p>
                      <p className="text-sm text-muted-foreground">Aviso anticipado</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Notificaciones de Leads</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Nuevo lead asignado</p>
                      <p className="text-sm text-muted-foreground">Notificar al embajador</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Lead sin actividad (7 días)</p>
                      <p className="text-sm text-muted-foreground">Recordar seguimiento</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button>Guardar Configuración</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personalización</CardTitle>
              <CardDescription>Configura la apariencia del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Logo de la Empresa</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center border-2 border-dashed">
                      <Palette className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline">Subir Logo</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-name">Nombre de la Empresa</Label>
                  <Input id="company-name" defaultValue="Constructora Shitoushui" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp-number">Número de WhatsApp Soporte</Label>
                  <Input id="whatsapp-number" defaultValue="+52 983 201 0889" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-medium mb-2">Vista previa del mensaje institucional:</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>Constructora Shitoushui</strong> - Empresa 100% mexicana comprometida con el cliente. 
                  Creamos espacios personalizados para cada tipo de gusto: desde casas en el desierto hasta 
                  cabañas en bosques fríos, edificios frente al mar y más.
                </p>
              </div>

              <Button>Guardar Cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
