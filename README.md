# Guia-Turistico-hispanohablates

Passo a Passo para executar o programa em cada máquina:
* Para esse programa foram utilizado ferramentas como Vite, MySQL Workbench e VSCODE, é fundamental que esses estejam presentes na máquina para o funcionamento do programa.

1 - No GitHub, clone o URL do projeto para sua área de transferência;
2 - Também no GitHub, salve o arquivo "guiaTuristico.sql";
3 - Abra o MySQL Workbench;
4 - Entre em uma conexão;
5 - Abra o arquivo "guiaTuristico.sql" em sua query 1, execute o arquivo.
3 - Em seguida, abra o VSCODE na máquina;
4 - Abra uma pasta onde será executado o programa;
5 - Abra um novo terminal e escreva "git clone " em seguida cole a URL do projeto;
6 - Certifique-se que foi clonado corretamente todas as pastas do projeto para seu gerenciador de arquivos;
7 - Caso não tenha clonado corretamente apague a pasta do guia turístico e repita o processo 4;
8 - Clonado corretamente, abra a pasta que foi clonada no seu VSCODE;
9 - Em seguida, abra a pasta "backend" e em seguida o arquivo "db.js";
10 - Certifique-se que o "user", "password", "port" estejam com as mesmas informações da sua máquina, caso necessário, altere as no arquivo e salve novamente (Ctrl S);
11 - Abra um novo terminal, garanta que o terminal não esteja em "powershell", recomendado cmd ou Git Bash ou outro que rode node;
12 - No terminal, escreva "cd backend", em seguida escreva "node server.js"
13 - Se aparecer a mensagem no terminal "Servidor rodando na porta 5000, Conectado ao MySQL!" está no caminho correto, caso contrário, certifique-se que as informações no db.js sejam as mesmas que a configuração de sua máquina, e se preciso, execute novamente passos anteriores;
14 - Em seguida, abra outra página do terminal e digite "cd frontend", depois "npm i"
15 - Após a instalação do npm, escreva "npm run dev" e execute;
16 - Por último, após a execução do comando, abra o link do localhost que aparecerá no terminal e nosso Guia Turístico estará ativo em sua máquina.
