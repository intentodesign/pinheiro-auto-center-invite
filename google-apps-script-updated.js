function doPost(e) {
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
}

// Função para testar localmente
function testFunction() {
  const mockEvent = {
    parameter: {
      name: 'Teste Local',
      phone: '(51) 99999-9999',
      guests: '2'
    }
  };
  
  const result = handleRequest(mockEvent, 'GET');
  console.log('Resultado do teste:', result.getContent());
}