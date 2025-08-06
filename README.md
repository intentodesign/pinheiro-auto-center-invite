# Pinheiro Auto Center - Convite Interativo

Convite digital para a reinauguração da Pinheiro Auto Center. Aplicação HTML/CSS/JavaScript pura, responsiva e com integração ao Google Apps Script.

## 🚀 Funcionalidades

- **4 Telas Sequenciais**: Splash screen, convite principal, formulário de confirmação e tela de sucesso
- **Design Responsivo**: Mobile-first com adaptação para desktop
- **Integrações Externas**:
  - Google Maps (detecção inteligente de dispositivo)
  - Google Calendar (múltiplas plataformas)
  - Google Apps Script (coleta de dados)
- **Sistema Robusto**: 5 estratégias diferentes de envio de dados
- **Experiência Offline**: Service Worker e backup local
- **Debug Panel**: Monitoramento de dados não enviados
- **Validação Completa**: Formulário com validação em tempo real

## 📁 Estrutura do Projeto

```
/
├── index.html              # Página principal
├── styles/
│   └── main.css            # Estilos principais
├── js/
│   └── app.js              # JavaScript principal
├── images/                 # Pasta de imagens
│   ├── logo/               # Logo da Pinheiro
│   │   └── pinheiro-logo.png
│   ├── backgrounds/        # Imagens de fundo
│   │   └── pattern.png
│   ├── icons/              # Ícones customizados (opcional)
│   └── sponsors/           # Logos de parceiros (opcional)
├── sw.js                   # Service Worker
├── README.md               # Este arquivo
└── google-apps-script-updated.js  # Código para Google Apps Script
```

## 🖼️ Configuração de Imagens

### Imagens Obrigatórias

Antes de usar o convite, você deve adicionar as seguintes imagens:

1. **`/images/logo/pinheiro-logo.png`**
   - Logo principal da Pinheiro Auto Center
   - Resolução: 400x400px (mínimo)
   - Formato: PNG com fundo transparente

2. **`/images/backgrounds/pattern.png`**
   - Padrão geométrico para fundo
   - Resolução: 1920x1080px (mínimo)
   - Formato: PNG ou JPG

### Como Adicionar Imagens

1. Navegue até a pasta `/images/`
2. Substitua os arquivos README.md em cada subpasta pelos arquivos de imagem reais
3. Mantenha os nomes de arquivo exatos conforme especificado
4. Teste o convite para verificar se as imagens carregam corretamente

### Imagens Opcionais

- **`/images/icons/`**: Para ícones personalizados (atualmente usa Lucide)
- **`/images/sponsors/`**: Para logos de parceiros (Mobil, Heliar)

## 🎨 Design

- **Fonte**: Goli (Google Fonts)
- **Cores Principais**:
  - Verde Escuro: #174C38
  - Verde Médio: #267859
  - Cinza Escuro: #2A2A2A
  - Branco: #F5F7F6
- **Padrão de Fundo**: Imagem com 3% de opacidade
- **Animações**: Fade in/out suaves entre telas

## 🔧 Configuração

### 1. Google Apps Script

1. Acesse [Google Apps Script](https://script.google.com)
2. Crie um novo projeto
3. Cole o código do arquivo `google-apps-script-updated.js`
4. Configure o ID da planilha na variável `SPREADSHEET_ID`
5. Deploy como Web App:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copie a URL gerada e substitua no arquivo `js/app.js`

### 2. Google Sheets

1. Crie uma planilha no Google Sheets
2. Configure as colunas:
   - A: Data/Hora
   - B: Nome
   - C: Telefone
   - D: Acompanhantes
   - E: Status
   - F: Método de Envio

### 3. Deploy

#### Preparação Pré-Deploy
1. **Adicione as imagens obrigatórias** nas pastas corretas
2. Teste localmente para verificar funcionamento
3. Configure o Google Apps Script conforme instruções

#### Netlify (Recomendado)
1. Faça upload dos arquivos para um repositório Git
2. Conecte o repositório ao Netlify
3. Deploy automático

#### GitHub Pages
1. Faça upload para um repositório GitHub
2. Ative GitHub Pages nas configurações
3. Selecione a branch main/master

#### Servidor Web Tradicional
1. Faça upload de todos os arquivos para o servidor
2. Configure o servidor para servir arquivos estáticos
3. Certifique-se que `index.html` seja o arquivo padrão

## 📱 Funcionalidades por Dispositivo

### Mobile
- **Maps**: Abre app nativo do Google Maps
- **Calendar**: Detecta iOS/Android e abre app apropriado
- **Layout**: Otimizado para toque e visualização vertical

### Desktop
- **Maps**: Abre Google Maps no navegador
- **Calendar**: Detecta Outlook vs Google Calendar
- **Layout**: Aproveita espaço horizontal disponível

## 🔄 Estratégias de Envio

O sistema utiliza 5 estratégias diferentes para garantir envio:

1. **POST no-cors**: Mais confiável para Apps Script
2. **GET com parâmetros**: Fallback por URL
3. **POST regular**: Tentativa com CORS
4. **FormData no-cors**: Alternativa de formato
5. **Image Beacon**: Técnica de rastreamento

## 🛠️ Debug e Monitoramento

### Debug Panel
- Localizado no canto inferior direito
- Mostra dados não enviados
- Permite download e limpeza de backup
- Aparece apenas quando há dados em backup

### Console Logs
- Logs detalhados de cada estratégia de envio
- Útil para diagnóstico de problemas
- Acesse pelo DevTools do navegador

## 🌐 Suporte a Navegadores

- **Chrome**: ✅ Suporte completo
- **Firefox**: ✅ Suporte completo
- **Safari**: ✅ Suporte completo
- **Edge**: ✅ Suporte completo
- **IE**: ❌ Não suportado

## 📋 Requisitos

- Servidor web (pode ser estático)
- **Imagens nas pastas corretas** (obrigatório)
- Conexão com internet para:
  - Google Fonts
  - Lucide Icons
  - Google Apps Script
  - Integrações externas

## ⚠️ Checklist Pré-Deploy

- [ ] Imagem do logo em `/images/logo/pinheiro-logo.png`
- [ ] Imagem de fundo em `/images/backgrounds/pattern.png`
- [ ] Google Apps Script configurado e testado
- [ ] Google Sheets criado com colunas corretas
- [ ] URL do Apps Script atualizada em `js/app.js`
- [ ] Teste local realizado com sucesso
- [ ] Todas as funcionalidades testadas

## 🔒 Segurança e Privacidade

- Dados enviados apenas para Google Sheets configurado
- Backup local apenas em caso de falha
- Sem coleta de dados não autorizados
- URLs de calendário e mapas são públicas e seguras

## 🚀 Performance

- **Service Worker**: Cache para uso offline
- **Lazy Loading**: Carregamento otimizado de recursos
- **Compressão**: CSS e JS otimizados
- **CDN**: Recursos externos via CDN

## 📞 Suporte

Para problemas técnicos:
1. Verifique se todas as imagens foram adicionadas
2. Confirme configuração do Google Apps Script
3. Teste URL do Apps Script diretamente
4. Verifique permissões da planilha
5. Consulte o console do navegador para erros

## 📄 Licença

Este projeto é específico para a Pinheiro Auto Center. Uso comercial requer autorização.

---

**Desenvolvido para Pinheiro Auto Center - 40 Anos Cortando Problemas Pela Raiz** 🚗