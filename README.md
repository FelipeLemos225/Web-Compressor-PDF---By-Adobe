# 🗜️ Adobe PDF Compressor

Sistema fullstack para **compressão de arquivos PDF** via [Adobe PDF Services API](https://developer.adobe.com/document-services/docs/overview/pdf-services/).  
Upload, compressão e download com interface moderna — tudo rodando localmente!

---

## ✨ Funcionalidades

- Upload e download de PDFs direto no navegador
- Compressão eficiente usando a API oficial da Adobe
- Mensagens, animações e feedback visual
- Limpeza automática dos arquivos temporários (backend)
- Projeto pronto para rodar com **um comando** usando [`concurrently`](https://www.npmjs.com/package/concurrently)

---

## 🚀 Como rodar localmente

1. **Clone o repositório**
    ```bash
    git clone https://github.com/FelipeLemos225/Adobe-Web-Compressor-PDF.git
    cd Adobe-Web-Compressor-PDF
    ```

2. **Configure as variáveis de ambiente do backend**  
   (na pasta `backend/`, crie um arquivo `.env` com suas credenciais da Adobe)

    PDF_SERVICES_CLIENT_ID=SEU_CLIENT_ID
    PDF_SERVICES_CLIENT_SECRET=SEU_CLIENT_SECRET
    

3. **Instale todas as dependências (raiz, backend e frontend)**
    bash
    npm install

4. **Inicie o sistema (backend + frontend)**
    bash
    npm start

5. **Acesse a interface:**
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend: [http://localhost:5000](http://localhost:5000) (API)

---

## 🗂️ Estrutura do projeto
Adobe-Web-Compressor-PDF/
├── backend/
│ ├── compress/
│ ├── uploads/
│ ├── output/
│ ├── app.js
│ ├── .env.example
│ └── package.json
├── frontend/
│ ├── public/
│ ├── src/
│ └── package.json
├── .gitignore
├── README.md
└── package.json # scripts unificados com concurrently

## 🖼️ Interface

<img width="1900" height="908" alt="image" src="https://github.com/user-attachments/assets/ccf6267f-cbbc-426a-90d0-b01c3c4a6eda" />
<img width="1902" height="906" alt="image" src="https://github.com/user-attachments/assets/d728ed0b-8c25-4cc6-a52b-acb0c33748d7" />
<img width="1900" height="908" alt="image" src="https://github.com/user-attachments/assets/d9d69b8a-848e-4aac-a161-2ab54da2c192" />
<img width="1898" height="908" alt="image" src="https://github.com/user-attachments/assets/0f1db709-8dee-4cbf-92df-a0b85ad0b825" />

---

## 🧑‍💻 Tecnologias usadas

- [React](https://react.dev/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [@adobe/pdfservices-node-sdk](https://www.npmjs.com/package/@adobe/pdfservices-node-sdk)
- [Concurrently](https://www.npmjs.com/package/concurrently)
- CSS puro
---

## 💡 Créditos

Desenvolvido por [Felipe Lemos](https://github.com/FelipeLemos225)  
API de compressão: [Adobe PDF Services](https://developer.adobe.com/document-services/docs/overview/pdf-services/)
