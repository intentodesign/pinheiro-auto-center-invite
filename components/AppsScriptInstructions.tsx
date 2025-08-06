'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle, AlertTriangle, Copy, ExternalLink } from 'lucide-react';

export function AppsScriptInstructions() {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = async (text: string, stepNumber: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStep(stepNumber);
      setTimeout(() => setCopiedStep(null), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const scriptCode = `function doPost(e) {
  return handleRequest(e, 'POST');
}

function doGet(e) {
  return handleRequest(e, 'GET');
}

function handleRequest(e, method) {
  try {
    console.log('=== APPS SCRIPT INICIADO ===');
    console.log('Método:', method);
    console.log('Dados recebidos:', e);
    
    // ID da sua planilha
    const SPREADSHEET_ID = '1sm8MuG-yLiKI7gGBhdCO-vO2VRAVqLVT6HnPyEXtewU';
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    let nome, telefone, acompanhantes;
    
    if (method === 'POST') {
      // Tentar pegar dados do POST body
      if (e.postData && e.postData.contents) {
        try {
          const data = JSON.parse(e.postData.contents);
          nome = data.name;
          telefone = data.phone;
          acompanhantes = data.guests;
        } catch (parseError) {
          console.log('Erro ao fazer parse do JSON, tentando FormData');
          // Se não conseguir fazer parse do JSON, tentar como form data
          nome = e.parameter.name;
          telefone = e.parameter.phone;
          acompanhantes = e.parameter.guests;
        }
      } else {
        // FormData ou parâmetros
        nome = e.parameter.name;
        telefone = e.parameter.phone;
        acompanhantes = e.parameter.guests;
      }
    } else {
      // GET - pegar dos parâmetros da URL
      nome = e.parameter.name;
      telefone = e.parameter.phone;
      acompanhantes = e.parameter.guests;
    }
    
    console.log('Dados extraídos:');
    console.log('Nome:', nome);
    console.log('Telefone:', telefone);
    console.log('Acompanhantes:', acompanhantes);
    
    // Validar dados
    if (!nome || !telefone || acompanhantes === undefined) {
      throw new Error('Dados incompletos: nome=' + nome + ', telefone=' + telefone + ', acompanhantes=' + acompanhantes);
    }
    
    const timestamp = new Date();
    
    // Adicionar na planilha (Colunas: A=Data, B=Nome, C=Telefone, D=Acompanhantes, E=Status, F=Método)
    const newRow = [timestamp, nome, telefone, acompanhantes, 'Confirmado', method];
    sheet.appendRow(newRow);
    
    console.log('✅ Dados salvos na planilha:', newRow);
    
    const successResponse = {
      status: 'success', 
      message: 'Presença confirmada com sucesso!',
      timestamp: timestamp.toISOString(),
      method: method
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(successResponse))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ Erro no Apps Script:', error);
    
    const errorResponse = {
      status: 'error', 
      message: error.toString(),
      timestamp: new Date().toISOString()
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg"
        >
          <AlertTriangle className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto bg-white">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Configuração do Google Apps Script
            </h2>
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              ×
            </Button>
          </div>

          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Se você está vendo erros de "Failed to fetch", siga estas instruções para configurar corretamente o Google Apps Script.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Passo 1: Atualize o código do Apps Script
              </h3>
              
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="flex justify-between items-center mb-2">
                  <span>google-apps-script-updated.js</span>
                  <Button
                    onClick={() => copyToClipboard(scriptCode, 1)}
                    size="sm"
                    variant="ghost"
                    className="text-green-400 hover:bg-gray-800"
                  >
                    {copiedStep === 1 ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <pre className="whitespace-pre-wrap text-xs">{scriptCode}</pre>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Passo 2: Configurações de Deploy
              </h3>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>No Google Apps Script, clique em <strong>"Deploy"</strong> → <strong>"New deployment"</strong></li>
                  <li>Tipo: <strong>"Web app"</strong></li>
                  <li>Execute as: <strong>"Me"</strong></li>
                  <li>Who has access: <strong>"Anyone"</strong> (importante para CORS)</li>
                  <li>Clique em <strong>"Deploy"</strong></li>
                  <li>Copie a URL do web app gerada</li>
                </ol>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Passo 3: Teste a URL
              </h3>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800 mb-2">
                  Cole esta URL no seu navegador para testar:
                </p>
                <div className="bg-white p-2 rounded border font-mono text-xs break-all">
                  https://script.google.com/macros/s/AKfycbwSQFioWCgLnoAodU-qcLJK3nWJfYDXQvLbsiyYG4Fon9bgsUf-gUs0OV8Q5lPVqozE/exec?name=Teste&phone=51999999999&guests=1
                </div>
                <Button
                  onClick={() => copyToClipboard('https://script.google.com/macros/s/AKfycbwSQFioWCgLnoAodU-qcLJK3nWJfYDXQvLbsiyYG4Fon9bgsUf-gUs0OV8Q5lPVqozE/exec?name=Teste&phone=51999999999&guests=1', 3)}
                  size="sm"
                  className="mt-2"
                >
                  {copiedStep === 3 ? <CheckCircle className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                  Copiar URL de Teste
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Passo 4: Verificação
              </h3>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>A URL de teste deve retornar um JSON com "status": "success"</li>
                  <li>Uma nova linha deve aparecer na sua planilha Google Sheets</li>
                  <li>Se der erro, verifique as permissões do Apps Script</li>
                  <li>Certifique-se que o ID da planilha está correto no código</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">Problemas Comuns:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                <li><strong>Failed to fetch:</strong> Configuração incorreta de permissões</li>
                <li><strong>Authorization required:</strong> Execute como "Me" e acesso "Anyone"</li>
                <li><strong>Script not found:</strong> URL incorreta ou deploy não feito</li>
                <li><strong>Permission denied:</strong> Conta não tem acesso à planilha</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => window.open('https://script.google.com/home', '_blank')}
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Abrir Google Apps Script
              </Button>
              <Button
                onClick={() => window.open('https://docs.google.com/spreadsheets/d/1sm8MuG-yLiKI7gGBhdCO-vO2VRAVqLVT6HnPyEXtewU/edit', '_blank')}
                variant="outline"
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Abrir Planilha
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}