import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGERENCIAS = [
  'Reporte de ventas Querétaro',
  'Cotización lote A-01 con 20% de enganche',
  'Leads prioritarios esta semana',
  'Métricas de embajadores',
  'Propiedades disponibles en zona selva',
];

const RESPUESTAS_DEMO: Record<string, string> = {
  'reporte': `📊 **Reporte de Ventas - Enero 2025**

**Resumen Ejecutivo:**
- Ventas totales: $4,850,000 MXN
- Leads convertidos: 12
- Tasa de conversión: 23%

**Top Proyectos:**
1. Selva Esmeralda - $2.1M
2. Montaña Sagrada - $1.8M
3. Costa Azul - $950K

**Tendencia:** ↑ 15% vs mes anterior`,

  'cotización': `💰 **Cotización Lote A-01 - Selva Esmeralda**

**Datos del Lote:**
- Ubicación: Zona Norte, Tulum
- Medidas: 10m x 25m (250m²)
- Precio: $850,000 MXN

**Plan de Pago (20% enganche):**
- Enganche: $170,000 MXN
- Saldo: $680,000 MXN
- 24 mensualidades de: $28,333 MXN

¿Deseas generar la cotización en PDF?`,

  'leads': `🎯 **Leads Prioritarios - Semana Actual**

1. **Juan Carlos Pérez** (75% prob.)
   - Proyecto: Selva Esmeralda
   - Etapa: Interesado
   - Siguiente acción: Visita programada

2. **María Fernanda Ruiz** (90% prob.)
   - Proyecto: Montaña Sagrada
   - Etapa: Enganche Pagado
   - Siguiente acción: Firma de contrato

3. **Ana Patricia Flores** (45% prob.)
   - Proyecto: Selva Esmeralda
   - Etapa: Calificado
   - Siguiente acción: Enviar cotización`,

  'embajadores': `👥 **Métricas de Embajadores - Enero 2025**

| Embajador | Ventas | Leads | KPI |
|-----------|--------|-------|-----|
| Laura Sánchez | $5.8M | 52 | 95 |
| Roberto López | $4.5M | 45 | 87 |
| Pedro Ramírez | $3.2M | 38 | 72 |
| Miguel Hernández | $2.1M | 28 | 65 |

**Promedio KPI del equipo:** 79.75`,

  'propiedades': `🏡 **Propiedades Disponibles - Zona Selva**

**Proyecto: Selva Esmeralda (Tulum)**

✅ **Disponibles (18 lotes):**
- Lote A-01: 250m² - $850,000
- Lote A-03: 300m² - $920,000
- Lote B-02: 350m² - $1,050,000
- ...y 15 más

**Tipos de Casa Recomendados:**
- Casa Tipo C
- Casa Loft
- Casa Elevada
- Casa Celosía

¿Te gustaría ver detalles de algún lote específico?`,
};

export default function ChatIA() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! 👋 Soy el asistente IA de Shitoushui. Puedo ayudarte con:\n\n• Reportes de ventas\n• Cotizaciones de lotes\n• Información de leads prioritarios\n• Métricas de embajadores\n• Búsqueda de propiedades\n\n¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simular respuesta de IA
    setTimeout(() => {
      const inputLower = input.toLowerCase();
      let response = 'Lo siento, no tengo información sobre eso. ¿Podrías ser más específico? Puedo ayudarte con reportes, cotizaciones, leads, embajadores o propiedades.';

      for (const [key, value] of Object.entries(RESPUESTAS_DEMO)) {
        if (inputLower.includes(key)) {
          response = value;
          break;
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSugerencia = (sugerencia: string) => {
    setInput(sugerencia);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center">
          <Bot className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Chat con IA</h1>
          <p className="text-sm text-muted-foreground">Asistente inteligente de Shitoushui</p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Preparado para OpenAI</span>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === 'user' ? "flex-row-reverse" : ""
              )}
            >
              <Avatar className={cn(
                "h-8 w-8 shrink-0",
                message.role === 'assistant' && "bg-primary"
              )}>
                <AvatarFallback className={message.role === 'assistant' ? "bg-primary text-primary-foreground" : ""}>
                  {message.role === 'assistant' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3",
                  message.role === 'user'
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted rounded-bl-md"
                )}
              >
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                <p className={cn(
                  "text-xs mt-1 opacity-60",
                  message.role === 'user' ? "text-right" : ""
                )}>
                  {message.timestamp.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Escribiendo...
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Suggestions */}
        <div className="px-4 py-2 border-t">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {SUGERENCIAS.map((sugerencia, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className="shrink-0 text-xs"
                onClick={() => handleSugerencia(sugerencia)}
              >
                {sugerencia}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={!input.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
