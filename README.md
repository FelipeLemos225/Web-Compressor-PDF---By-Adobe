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

2. **Configure o token de acesso ao Sydle One no backend**

     Na pasta backend/, crie um arquivo .env contendo seu token de acesso ao Sydle One
    ```bash
     SYDLE_TOKEN=SEU_TOKEN_DE_AUTENTICACAO_DO_SYDLE_ONE
     ```
    ⚠️ Não é necessário incluir as credenciais Adobe diretamente — elas serão buscadas da API do Sydle One.
    

3. **Instale todas as dependências (raiz, backend e frontend)**
    ```bash
    npm install
    ```

4. **Inicie o sistema (backend + frontend)**
    ```bash
    npm start
    ```

5. **Acesse a interface:**
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend: [http://localhost:5000](http://localhost:5000) (API)

---

## 🗂️ Estrutura do projeto

 ```bash
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
```
---

## 🖼️ Interface

<img width="1900" height="908" alt="image" src="https://github.com/user-attachments/assets/ccf6267f-cbbc-426a-90d0-b01c3c4a6eda" />
<img width="1894" height="865" alt="image" src="https://github.com/user-attachments/assets/b5e19186-23ac-4755-829e-cccd43a6a868" />
<img width="1894" height="863" alt="image" src="https://github.com/user-attachments/assets/dc638d4b-8085-4c3b-8334-9421017b75aa" />
<img width="1895" height="868" alt="image" src="https://github.com/user-attachments/assets/a9441037-a648-42ba-bed8-7b6aac400eb0" />
<img width="1896" height="857" alt="image" src="https://github.com/user-attachments/assets/da81bc81-48b1-4989-98dc-276e9cd100bf" />
<img width="1894" height="859" alt="image" src="https://github.com/user-attachments/assets/2abc276e-640c-41dd-b253-da3afc6b5593" />

---

## 🧑‍💻 Tecnologias usadas

- [React](https://react.dev/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [@adobe/pdfservices-node-sdk](https://www.npmjs.com/package/@adobe/pdfservices-node-sdk)
- [Concurrently](https://www.npmjs.com/package/concurrently)
- CSS puro
---

## 🛡️ Segurança

- As credenciais da Adobe são buscadas exclusivamente do seu ambiente Sydle One via backend.
- O token de autenticação do Sydle One deve ser mantido em segredo no arquivo .env do backend.
- Nunca exponha credenciais sensíveis no frontend.

---

## 💡 Créditos

Desenvolvido por [Felipe Lemos](https://github.com/FelipeLemos225)  
API de compressão: [Adobe PDF Services](https://developer.adobe.com/document-services/docs/overview/pdf-services/)
