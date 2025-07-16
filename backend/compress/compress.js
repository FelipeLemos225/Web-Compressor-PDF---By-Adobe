//--------------------------------Importação de Dependências-----------------------------------------------//

const fs = require("fs"); //módulo do Node para manipulação de arquivos
const path = require("path"); //módulo para montar caminhos seguros
const { //importação das classes do SDK da Adobe
  ServicePrincipalCredentials, //cria as credenciais da conta Adobe
  PDFServices, //API usada pelo cliente
  MimeType, //enumera tipos de arquivo
  CompressPDFJob, //classe para operar a compressão
  CompressPDFParams,
  CompressionLevel, //nível de compressão: LOW, MEDIUM, HIGH)
  CompressPDFResult,
  ServiceApiError //classe-pai de erros retornados pelo serviço
} = require("@adobe/pdfservices-node-sdk");

//----------------------------------------Exportação e Configuração da Função de Compressão--------------------------------//

module.exports = async function compressPDF(inputFilePath) {
  try {
    const credentials = new ServicePrincipalCredentials({
      clientId: process.env.PDF_SERVICES_CLIENT_ID,
      clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET,
    });

    const pdfServices = new PDFServices({ credentials });

    const readStream = fs.createReadStream(inputFilePath);
    const inputAsset = await pdfServices.upload({
      readStream,
      mimeType: MimeType.PDF,
    });

    const params = new CompressPDFParams({
      compressionLevel: CompressionLevel.HIGH,
    });

    const job = new CompressPDFJob({ inputAsset, params });
    const pollingURL = await pdfServices.submit({ job });

    const response = await pdfServices.getJobResult({
      pollingURL,
      resultType: CompressPDFResult,
    });

    const resultAsset = response.result.asset;
    const streamAsset = await pdfServices.getContent({ asset: resultAsset });

    const outputDir = "output";
    fs.mkdirSync(outputDir, { recursive: true });

    const outputFile = path.join(outputDir, `compressed-${Date.now()}.pdf`);
    const outputStream = fs.createWriteStream(outputFile);
    streamAsset.readStream.pipe(outputStream);

    await new Promise((resolve) => outputStream.on("finish", resolve));
    return outputFile;

  } catch (err) {
    // Tratamento de erro com códigos da Adobe
    if (err instanceof ServiceApiError) {
      if (err._errorCode === "PDF_ALREADY_COMPRESSED") {
        throw new Error("Este arquivo já está comprimido e não pode ser otimizado novamente.");
      } else if (err._errorCode === "INVALID_INPUT") {
        throw new Error("O arquivo enviado é inválido ou está corrompido.");
      } else if (err._errorCode === "UNSUPPORTED_OPERATION") {
        throw new Error("Esta operação não é suportada para este tipo de arquivo.");
      }
    }

    // Se não for erro reconhecido, relança como está
    throw err;
  }
};
