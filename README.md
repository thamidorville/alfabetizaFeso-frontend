# DOCUMENTO DE LEVANTAMENTO DE REQUISITOS – SISTEMA ALFABETIZA FESO

## 1. Introdução

### 1.1. Propósito
Este documento tem como finalidade descrever de forma clara e detalhada os requisitos funcionais, não funcionais e as regras de negócio do sistema Alfabetiza Feso.
O documento servirá como base para o desenvolvimento, validação e manutenção do sistema, garantindo que as funcionalidades atendam às necessidades dos usuários e da instituição FESO.

### 1.2. Escopo
O Alfabetiza Feso é um sistema web desenvolvido em .NET ASP Core com Vue 3 no front-end e PostgreSQL como banco de dados.
Seu objetivo é gerenciar o processo de alfabetização por meio de aulas ministradas por educadores, permitindo que alunos se inscrevam, acompanhem suas aulas e registrem presença em um ambiente digital simples e acessível.

O sistema contemplará os seguintes perfis de usuário:

**Usuario**: entidade unificada que representa tanto educadores quanto alunos, diferenciados pelo campo role ("educador" | "aluno").

**Educador**: usuário com role "educador", responsável pela criação e gestão de aulas e pela marcação de presenças.

**Aluno**: usuário com role "aluno", responsável por visualizar e se inscrever nas aulas disponíveis, além de acompanhar seu histórico.

**Administrador (opcional)**: responsável por supervisionar o sistema e gerenciar usuários e cursos.

## 2. Descrição Geral do Sistema
O sistema permitirá:

- O cadastro e autenticação de educadores e alunos em uma entidade unificada;
- A criação e edição de aulas por educadores;
- A inscrição de alunos em aulas;
- O registro de presenças e geração de relatórios;
- A consulta de histórico de aulas e presenças;
- Listagens específicas de educadores e alunos para dashboards otimizados.

O sistema não tratará inicialmente de localização geográfica ou endereços, priorizando um MVP funcional e de fácil manutenção.

## 3. Requisitos Funcionais (RF)

**RF01 – Cadastro de Usuário**
O sistema deve permitir o cadastro de usuários com os seguintes campos: nome, e-mail, telefone, senha, descrição (opcional) e role ("educador" | "aluno").

**RF01.1 – Cadastro de Educador**
Para usuários com role "educador", o campo especialidade é obrigatório.

**RF01.2 – Cadastro de Aluno**
Para usuários com role "aluno", o campo especialidade deve ser nulo.

**RF02 – Autenticação de Usuário**
O sistema deve autenticar usuários com base em e-mail e senha, identificando automaticamente o role do usuário para controle de acesso.

**RF03 – Criação de Aula**
O educador deve poder criar uma aula informando título, descrição, data de início, data final e status.

**RF04 – Edição e Exclusão de Aula**
O educador deve poder editar e excluir suas próprias aulas, desde que não estejam concluídas.

**RF05 – Visualização de Aulas**
O aluno deve poder visualizar as aulas disponíveis filtrando por educador ou palavra-chave.

**RF06 – Inscrição em Aula**
O aluno deve poder se inscrever em aulas disponíveis.

**RF07 – Cancelamento de Inscrição**
O aluno deve poder cancelar sua inscrição em uma aula até um prazo pré-definido.

**RF08 – Registro de Presenças**
O educador deve poder registrar a presença dos alunos inscritos em cada aula.

**RF09 – Consulta de Presenças**
O aluno deve poder consultar suas presenças e ausências.

**RF10 – Relatórios de Aulas e Presenças**
O sistema deve gerar relatórios de aulas ministradas e presenças registradas.

**RF11 – Controle de Status da Aula**
Cada aula deve possuir um status: Agendada, Concluída ou Cancelada.

**RF12 – Histórico de Aulas do Aluno**
O aluno deve poder visualizar um histórico com todas as aulas em que participou.

**RF13 – Notificações Internas (Futuro)**
O sistema poderá notificar o educador quando um novo aluno se inscrever e notificar alunos sobre alterações ou cancelamentos.

**RF14 – Listagem de Educadores**
O sistema deve fornecer endpoint específico para listar apenas usuários com role "educador", otimizado para dashboards de alunos.

**RF15 – Listagem de Alunos**
O sistema deve fornecer endpoint específico para listar apenas usuários com role "aluno", otimizado para dashboards de educadores.

## 4. Regras de Negócio (RN)

**RN01 – Inscrição Única por Aula**
Um aluno não pode se inscrever mais de uma vez na mesma aula.

**RN02 – Cancelamento de Aula**
Somente o educador responsável pode cancelar uma aula.

**RN03 – Fluxo de Status da Aula**
O status da aula deve seguir o fluxo:
"Agendada" → "Concluída"
ou
"Agendada" → "Cancelada".

**RN04 – Registro de Presença Pós-Conclusão**
Após a aula ser marcada como "Concluída", não será possível alterar os registros de presença.

**RN05 – Cancelamento de Inscrição**
O aluno só poderá cancelar a inscrição até um prazo pré-determinado antes do início da aula.

**RN06 – Notificação de Alterações (Futuro)**
Em versões futuras, sempre que uma aula for alterada ou cancelada, os alunos inscritos deverão ser notificados automaticamente.

**RN07 – Acesso Restrito por Perfil de Usuário**
O sistema deve restringir o acesso aos endpoints conforme o perfil do usuário autenticado:
- Apenas usuários com perfil de Educador podem acessar endpoints relacionados à criação, edição, cancelamento de aulas e registro de presenças.
- Apenas usuários com perfil de Aluno podem se inscrever em aulas, consultar histórico de presença e cancelar inscrições.
- O sistema validará o perfil do usuário por meio de roles atribuídas nas claims de autenticação.

**RN08 – Unificação de Usuários**
- Educadores e alunos são armazenados na mesma tabela usuarios
- A diferenciação é feita pelo campo role com valores "educador" ou "aluno"
- O campo especialidade é obrigatório apenas para usuários com role "educador"
- O campo especialidade deve ser nulo para usuários com role "aluno"
- Um usuário pode alterar seu role mediante validação de negócio (futuro)

**RN09 – Validação de Integridade por Role**
- Apenas usuários com role "educador" podem ser referenciados como educador_id na tabela aulas
- Apenas usuários com role "aluno" podem ser referenciados como aluno_id na tabela inscricoes
- O sistema deve validar essas regras tanto na aplicação quanto no banco de dados

## 5. Requisitos Não Funcionais (RNF)

**RNF01 – Plataforma**
O sistema será desenvolvido em .NET ASP Core no back-end e Vue 3 no front-end.

**RNF02 – Banco de Dados**
O banco de dados utilizado será o PostgreSQL, com integração via Entity Framework.

**RNF03 – Segurança**
As senhas dos usuários devem ser armazenadas utilizando hashing criptográfico seguro.

**RNF04 – Desempenho**
O sistema deve ser capaz de suportar até 1000 usuários simultâneos com tempo de resposta inferior a 2 segundos por requisição.

**RNF05 – Usabilidade**
A interface deve ser simples, intuitiva e responsiva, compatível com dispositivos móveis e desktop.

**RNF06 – Manutenibilidade**
O código deve seguir boas práticas de engenharia de software e ser facilmente compreensível por novos desenvolvedores.

**RNF07 – Escalabilidade**
O sistema deve permitir a adição de novas funcionalidades sem necessidade de grandes reestruturações.

**RNF08 – Disponibilidade**
O sistema deve estar disponível 24 horas por dia, com janelas de manutenção previamente programadas.

**RNF09 – Internacionalização (Futuro)**
O sistema deverá permitir, futuramente, suporte a múltiplos idiomas.

**RNF10 – Identificação Segura de Usuário via Claims**
- O sistema deve utilizar claims presentes no token de autenticação (JWT ou equivalente) para identificar o usuário logado nos endpoints protegidos.
- O Id do Educador ou Aluno será inferido a partir das claims do usuário autenticado.
- Não será permitido que o cliente (front-end) envie o identificador manualmente para ações relacionadas ao próprio usuário, como criar aulas ou se inscrever.
- Isso garante segurança, integridade dos dados e menor risco de manipulação indevida via requisição.

**RNF11 – Otimização de Consultas por Role**
O sistema deve implementar índices otimizados no campo role para garantir performance adequada nas consultas filtradas por tipo de usuário.

**RNF12 – DTOs Específicos por Contexto**
O sistema deve utilizar DTOs específicos para cada contexto de listagem, evitando exposição desnecessária de dados e otimizando o payload das respostas.

## 6. Modelo Conceitual (Resumo das Entidades)

- **Usuario**: id, nome, e-mail, telefone, senha_hash, descrição, role, especialidade (condicional).
- **Aula**: id, título, descrição, data_inicio_utc, data_final_utc, educador_id (referencia Usuario com role="educador").
- **Inscrição**: aluno_id (referencia Usuario com role="aluno"), aula_id, data_inscricao (chave composta).
- **Presença**: id, id_inscricao, presente (boolean).

## 7. Casos de Uso Resumidos

**UC01 – Cadastrar Aula**
Ator: Educador.
Descrição: o educador cria uma aula preenchendo os campos obrigatórios e o sistema grava no banco de dados.

**UC02 – Inscrever-se em Aula**
Ator: Aluno.
Descrição: o aluno se inscreve em uma aula disponível, e o sistema registra a inscrição.

**UC03 – Registrar Presença**
Ator: Educador.
Descrição: o educador marca os alunos presentes e o sistema grava os dados na tabela de presenças.

**UC04 – Consultar Relatório de Aulas**
Ator: Educador ou Aluno.
Descrição: o usuário acessa o histórico de aulas e presenças conforme seu perfil.

**UC05 – Listar Educadores**
Ator: Aluno.
Descrição: o aluno visualiza lista de educadores disponíveis para escolher aulas.

**UC06 – Listar Alunos**
Ator: Educador.
Descrição: o educador visualiza lista de alunos para gerenciamento de turmas.

## 8. Requisitos Futuros

- Integração com plataformas de videoconferência (Google Meet, Zoom).
- Envio de e-mails automáticos de notificação.
- Sistema de feedback entre aluno e educador.
- Dashboard analítico com métricas de desempenho e engajamento.
- Cadastro de turmas e grupos de estudo.
- Alteração de role de usuário com validação de negócio.

## 9. Considerações Finais

O documento de requisitos do Alfabetiza Feso define o escopo inicial do sistema e orienta todas as etapas de desenvolvimento, testes e implantação.
A arquitetura de usuário unificado (STI - Single Table Inheritance) foi escolhida para simplificar o modelo de dados mantendo flexibilidade para evolução futura.
Qualquer mudança de escopo deverá ser formalmente documentada e aprovada pela equipe técnica e pelo cliente.
As próximas etapas incluem a implementação dos endpoints específicos de listagem e otimizações de performance.

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>

# Acesse a pasta do projeto
cd alfabetizaFeso-frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O projeto ficará disponível em: http://localhost:5173

### Tecnologias utilizadas
- Vue 3
- Vite
- Element Plus
- Vue Router
- Pinia (planejado)
