# Oficina 2.0
Existe uma oficina mecânica que diariamente recebe diversos pedidos de orçamento por telefone e clientes que vão pessoalmente até o estabelecimento. 
Contudo, organizar os orçamentos e os clientes por meio de papel está ocasionando na perda de diversas oportunidades de vendas, pois os papéis se 
perdem no meio da bagunça da oficina, além de ser pouco eficiente e nada moderno. Os registros de orçamento são simples, bem como as consultas que precisam 
ser feitas.

## Instalação
- `cd {oficina_20}/backend`
- `npm install`
- `composer install`
- copie o `.env.example` e o renomeie para `.env`.
- `php artisan key:generate`
- `./vendor/bin/sail up` <sub>Obs: o Docker precisa estar ativo.</sub>
- `php artisan migrate`
- `php artisan db:seed`
- altere a linha 12 do `.env` para `DB_HOST=mysql`

<br>

Para o funcionamento do frontend, os comandos serão <br>
- `cd {oficina_20}/frontend`
- `docker run --volume "{oficina_20_ABSOLUTE_PATH}/frontend:/src/oficina" --workdir "/src/oficina" --name frontend --publish 8080:8080 -it node:18 bash`
- `npm install -g npm@9.2.0`
- `npm i -g @quasar/cli`
- `quasar dev`

## Ferramentas e versões
<table>
  <tr>
    <th><b>Ferramenta</b></th>
    <th><b>Versão</b></th>
  </tr>
  <tr>
    <td>PHP</td>
    <td>8.1.11</td>
  </tr>
  <tr>
    <td>Laravel</td>
    <td>9.45.1</td>
  </tr>
  <tr>
    <td>Vue.js</td>
    <td>3</td>
  </tr>
  <tr>
    <td>Quasar Framework</td>
    <td>3.6.2</td>
  </tr>
  <tr>
    <td>NPM</td>
    <td>9.2.0</td>
  </tr>
</table>

## Documentação
A documentação completa está disponível [neste link](https://docs.google.com/document/d/1Yv6xLkbB1xToPtIk8IIm-psH1MRbwQiwUK2vlX1faaM/edit?usp=sharing).

