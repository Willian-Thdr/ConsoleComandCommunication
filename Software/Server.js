const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath;

  switch (req.url) {
    case '/':
    case '/index.html':
      filePath = path.join(__dirname, 'Source', 'View', 'index.html');
      break;

    // Mudamos para .js para o navegador do celular conseguir ler
    case '/renderer.ts':
    case '/View/renderer.ts':
      filePath = path.join(__dirname, 'Source', 'View', 'renderer.js');
      break;

    case '/index.css':
    case '/Style/index.css':
      filePath = path.join(__dirname, 'Source', 'Style', 'index.css');
      break;

    // Corrigido os dois-pontos (:) que faltavam aqui
    case '/main.ts':
    case '/Controller/main.ts':
      filePath = path.join(__dirname, 'Source', 'Controller', 'main.js');
      break;
      
    default:
      // Caso peça um arquivo que não mapeamos acima
      filePath = path.join(__dirname, 'Source', req.url);
  }
  
  // Se nenhuma rota bater e filePath for indefinido, evita que o app trave
  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Rota inválida.');
    return;
  }

  const extname = path.extname(filePath).toLowerCase();

  // MimeTypes corretos para o navegador aceitar o design e os scripts
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.ts': 'application/typescript; charset=utf-8' 
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        // Corrigido de urlPath para req.url
        res.end('Arquivo não encontrado: ' + req.url); 
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Erro interno no servidor: ' + err.code);
      }
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor completo rodando em http://localhost:${PORT}`);
});