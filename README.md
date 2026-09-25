
Guia Turístico para Hispanohablantes
Sobre o projeto:

O Guia Turístico para Hispanohablantes é um projeto desenvolvido para oferecer informações e recursos turísticos para pessoas que falam espanhol.

Para executar o projeto corretamente em uma máquina, é necessário ter algumas ferramentas instaladas e realizar a configuração do banco de dados e do ambiente de desenvolvimento.

 Ferramentas necessárias:

Antes de iniciar, certifique-se de que as seguintes ferramentas estão instaladas na máquina:

Vite
MySQL Workbench
Visual Studio Code (VS Code)
Node.js
Git

É fundamental que essas ferramentas estejam instaladas e configuradas corretamente para que o projeto funcione.

 Passo a passo para executar o projeto:
1. Clonar o projeto
Acesse o repositório do projeto no GitHub.
Copie a URL do repositório para a área de transferência.
Abra o Visual Studio Code.
Escolha ou crie uma pasta onde o projeto será executado.
Abra um novo terminal no VS Code.
Execute o comando:
git clone URL_DO_PROJETO


Substitua URL_DO_PROJETO pela URL copiada do GitHub.

Exemplo:

git clone https://github.com/usuario/Guia-Turistico-hispanohablantes.git

Certifique-se de que todas as pastas e arquivos do projeto foram clonados corretamente.
Caso o processo não tenha sido concluído corretamente, exclua a pasta do projeto e repita o processo de clonagem.
Após a clonagem, abra a pasta do projeto no VS Code.
2. Configurar o banco de dados

No GitHub, localize e baixe o arquivo:
guiaTuristico.sql

Abra o MySQL Workbench.
Entre em uma conexão configurada na sua máquina.
Abra o arquivo guiaTuristico.sql no MySQL Workbench.
Execute todo o script SQL para criar e configurar o banco de dados.

3. Configurar a conexão com o MySQL
No VS Code, abra a pasta do projeto.
Entre na pasta:
backend

Localize e abra o arquivo:
db.js

Verifique as configurações de conexão com o banco de dados, principalmente:
user
password
port

Essas informações devem ser iguais às configurações do MySQL da sua máquina.

Caso seja necessário, altere as informações no arquivo db.js.
Salve o arquivo utilizando:
Ctrl + S

4. Iniciar o Backend
Abra um novo terminal no VS Code.
Certifique-se de que o terminal não esteja utilizando PowerShell.

É recomendado utilizar CMD, Git Bash ou outro terminal compatível com Node.js.

No terminal, entre na pasta backend:
cd backend;
Digite:
npm i

Em seguida, execute o servidor: node.js
Se tudo estiver configurado corretamente, deverá aparecer uma mensagem semelhante a:
Servidor rodando na porta 5000, Conectado ao MySQL!

 Caso apareça algum erro

Verifique novamente as informações presentes no arquivo db.js, principalmente:

Usuário do MySQL (user);
Senha do MySQL (password);
Porta do MySQL (port).

Corrija as informações, salve o arquivo e execute novamente:

5. Instalar as dependências do Frontend
Abra uma nova aba do terminal no VS Code.
Entre na pasta frontend:
cd frontend

Instale as dependências do projeto utilizando:
npm i
npm install react@19.2.8 react-dom@19.2.8
npm i react-icons


Aguarde a conclusão da instalação.

6. Executar o Frontend

Após a instalação das dependências, execute:

npm run dev


O Vite iniciará o servidor de desenvolvimento e exibirá no terminal um endereço semelhante a:

http://localhost:5173/

Abra o endereço localhost exibido no terminal em seu navegador.
 Projeto em funcionamento

Após seguir todos os passos corretamente:

O MySQL estará configurado e com o banco de dados do projeto;
O Backend estará funcionando na porta 5000;
O Frontend estará sendo executado pelo Vite;
O Guia Turístico para Hispanohablantes estará disponível no navegador.

