
## Configurar

Necessário ter o instantCliente para localizar a lib da oracle, pode ser baixado [aqui](https://www.oracle.com/br/database/technologies/instant-client/downloads.html)

## Executar

`npm start`

## Passos para criar banco de dados

1. Logar no Docker hub (Acfessar o repositório da [Oracle](https://hub.docker.com/u/diegotelles/content/sub-a311e399-e0ee-4c28-ae6f-75eebc7d2635))
 docker login
2. Download image
 docker pull store/oracle/database-enterprise:12.2.0.1
3. Run image
 docker run -d -p 1521:1521 --name oracle store/oracle/database-enterprise:12.2.0.1
4. Conectar com o container
 docker exec -it oracle bash -c "source /home/oracle/.bashrc; sqlplus /nolog"

5. Configurar o usuário do banco

 connect sys as sysdba;
 -- Entre com a senha padrão do usuário sys: 'Oradoc_db1'

 Altere sua Sessão:
 alter session set "_ORACLE_SCRIPT"=true;

 Crie seu usuário:
 create user seuUser identified by seuUser; 

 Dê privilégios para ele:
 GRANT ALL PRIVILEGES TO seuUser;

4. Configure SQL Developer ou qualquer outro gerenciador de Banco (Eu uso o DataGrip, por exemplo)

 Username: seuUser
 Password: seuUser
 Hostname: localhost
 Port: 1521
 Service name: ORCLCDB.localdomain