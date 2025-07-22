//--------------------------------Importação de Dependências-----------------------------------------------//

const axios = require("axios"); //importa o axios
const fs = require("fs"); //módulo do Node para manipulação de arquivos
const path = require("path"); //módulo para montar caminhos seguros
const {
  //importação das classes do SDK da Adobe
  ServicePrincipalCredentials, //cria as credenciais da conta Adobe
  PDFServices, //API usada pelo cliente
  MimeType, //enumera tipos de arquivo
  CompressPDFJob, //classe para operar a compressão
  CompressPDFParams,
  CompressionLevel, //nível de compressão: LOW, MEDIUM, HIGH)
  CompressPDFResult,
  ServiceApiError, //classe-pai de erros retornados pelo serviço
  ClientConfig,
} = require("@adobe/pdfservices-node-sdk");

//---------------------------------------Função para pegar Credenciais no SydleOne-------------------------------------------//

async function getAdobeCredentials() {
  const response = await axios.post(
    "https://animaeducacao-dev.sydle.one/api/1/adobe/br.com.animaeducacao.ecm/AdobeCredentials/_get",
    { _id: "6877f3c93f3884281a57af6e" },
    {
      headers: {
        Authorization: `Bearer ${process.env.SYDLE_TOKEN}`,
      },
    }
  );
  const cred = response.data;
  if (!cred) throw new Error("Credenciais Adobe não encontradas!");
  return {
    clientId: cred.clientID,
    clientSecret: cred.clientSecret,
  };
}

//----------------------------------------Exportação e Configuração da Função de Compressão--------------------------------//

module.exports = async function compressPDF(inputFilePath, compressionLevel = "HIGH") {
  try {
    const { clientId, clientSecret } = await getAdobeCredentials();

    const credentials = new ServicePrincipalCredentials({
      clientId,
      clientSecret,
    });

    const clientConfig = new ClientConfig({ timeout: 60000 }); // 60 segundos

    const pdfServices = new PDFServices({
      credentials,
      clientConfig,
    });

    const readStream = fs.createReadStream(inputFilePath);
    const inputAsset = await pdfServices.upload({
      readStream,
      mimeType: MimeType.PDF,
    });

    const params = new CompressPDFParams({
      compressionLevel: CompressionLevel[compressionLevel],
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
        throw new Error(
          "Este arquivo já está comprimido e não pode ser otimizado novamente."
        );
      } else if (err._errorCode === "INVALID_INPUT") {
        throw new Error("O arquivo enviado é inválido ou está corrompido.");
      } else if (err._errorCode === "UNSUPPORTED_OPERATION") {
        throw new Error(
          "Esta operação não é suportada para este tipo de arquivo."
        );
      } else if (err._errorCode === "invalid_client") {
        throw new Error(
          "As credenciais da conta ADOBE estão incorretas. Acesse o SydleOne para corrigir."
        );
      } else if (
        err._errorCode === "DOCUMENT_RESTRICTED" ||
        (err.message &&
          err.message.includes(
            "Source file cannot be processed because of some restrictions"
          ))
      ) {
        throw new Error(
          "O arquivo PDF não pôde ser processado devido a restrições internas (proteção, assinatura ou bloqueio). " +
            "Para tentar resolver, abra o PDF em seu leitor, selecione 'Imprimir' e salve essa versão de impressão novamente como PDF. Depois tente comprimir o novo arquivo."
        );
      }
    }

    // Se não for erro reconhecido, relança como está
    throw err;
  }
};
