'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { AlertCircle, Download, Trash2 } from 'lucide-react';

interface BackupData {
  name: string;
  phone: string;
  guests: string;
  timestamp: string;
  failedAt?: string;
  error?: string;
  userAgent?: string;
  url?: string;
}

export function DebugPanel() {
  const [backupData, setBackupData] = useState<BackupData[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadBackupData();
  }, []);

  const loadBackupData = () => {
    try {
      const data = JSON.parse(localStorage.getItem('pinheiro_backup_confirmations') || '[]');
      setBackupData(data);
    } catch (error) {
      console.error('Erro ao carregar dados de backup:', error);
    }
  };

  const clearBackupData = () => {
    localStorage.removeItem('pinheiro_backup_confirmations');
    setBackupData([]);
  };

  const downloadBackupData = () => {
    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pinheiro-backup-confirmations-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Only show if there's backup data or in development
  if (backupData.length === 0 && !window.location.href.includes('localhost')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isVisible ? (
        <Button
          onClick={() => setIsVisible(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg"
        >
          <AlertCircle className="w-5 h-5" />
          {backupData.length > 0 && (
            <span className="ml-2 bg-white text-orange-500 px-2 py-1 rounded-full text-xs font-bold">
              {backupData.length}
            </span>
          )}
        </Button>
      ) : (
        <Card className="w-80 max-h-96 overflow-auto bg-white border-2 border-orange-500 shadow-xl">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-orange-600 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Debug Panel
              </h3>
              <Button
                onClick={() => setIsVisible(false)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                ×
              </Button>
            </div>

            {backupData.length > 0 ? (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  {backupData.length} confirmação(ões) em backup local
                </p>

                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {backupData.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded text-xs">
                      <div><strong>Nome:</strong> {item.name}</div>
                      <div><strong>Telefone:</strong> {item.phone}</div>
                      <div><strong>Acompanhantes:</strong> {item.guests}</div>
                      <div><strong>Data:</strong> {new Date(item.timestamp).toLocaleString('pt-BR')}</div>
                      {item.error && (
                        <div className="text-red-600 mt-1">
                          <strong>Erro:</strong> {item.error}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={downloadBackupData}
                    size="sm"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  <Button
                    onClick={clearBackupData}
                    size="sm"
                    variant="destructive"
                    className="flex-1"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Limpar
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-600">
                Nenhum dado em backup. Todas as confirmações foram enviadas com sucesso!
              </p>
            )}

            <div className="mt-4 p-2 bg-blue-50 rounded text-xs text-blue-800">
              <strong>Info:</strong> Este painel mostra confirmações que falharam ao enviar para a planilha. 
              Os dados ficam salvos localmente como backup.
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}