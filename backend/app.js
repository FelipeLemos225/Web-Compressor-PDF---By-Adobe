//--------------------------------Importação de Dependências-----------------------------------------------//

const express = require("express"); //framework do Backend
const multer = require("multer"); //biblioteca que lida com uploads de arquivos recebidos em requisições.
const dotenv = require("dotenv"); //permite carregar variáveis do arquivo .env
const cors = require("cors"); //gerencia requisições do frontend com backend
const compressPDF = require("./compress/compress"); //módulo de compressão da Adobe API
const fs = require("fs"); //módulo do Node para manipulação de arquivos
const path = require("path"); //módulo para montar caminhos seguros

//---------------------------------Configuração Básica da Aplicação---------------------------------------//

dotenv.config(); //lê o .env no início e disponibiliza para process.env
const app = express(); // inicializa o Express
app.use(cors({ origin: "*" })); // ativa o CORS
app.use(express.json()); // receber /json no corpo das requisições

//---------------------------------Configuração multer para upload-----------------------------------------//

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

//------------------------------------Rota Principal de Compressão do PDF-----------------------------------//

app.post("/compress", upload.single("file"), async (req, res) => {
  try {
    const inputPath = req.file.path;
    const compressionLevel = req.body.compressionLevel || "HIGH";
    const outputPath = await compressPDF(inputPath, compressionLevel);
    res.download(outputPath);
  } catch (err) {
    console.error("Erro detalhado:", err);

    let errorMessage = err.message || "Erro ao comprimir o PDF.";
    res.status(500).json({ error: errorMessage });
  }
});

//------------------------------------Inicialização do Servidor----------------------------------------------//

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

//--------------------------------------Função para limpar arquivos antigos das pastas-------------------------//

function limparPastas() {
  const pastas = ["uploads", "output"];

  pastas.forEach((pasta) => {
    const dirPath = path.join(__dirname, pasta);
    fs.readdir(dirPath, (err, files) => { //leitura dos arquivos
      if (err) {
        console.error(`Erro ao ler ${pasta}:`, err);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        fs.unlink(filePath, (err) => { //deletando os arquivos
          if (err) {
            console.error(`Erro ao apagar ${filePath}:`, err);
          }
        });
      });
    });
  });
}

//-------------------------------Configuração para limpeza-----------------------------------//
setInterval(() => {
  console.log("Limpando pastas uploads/ e output/...");
  limparPastas();
}, 3600000);
