# Asthriona's blog 2.0
Waw! a new blog! ^w^
hell yeah and this time no storyblok or anything like that everything run on my own servers ^w^

# How to install
You need NodeJS installed and Running.  
You also need a mongoDB.  
```
git clone https://github.com/Asthriona/Blog2.0
cd Blog2.0/
npm i 
nano config.json
```
your config.json must look like this:
```
{
    dbURI: "mongodb://username:password@localhost/Asthionablog"
}
```

# Exemple of config.json
```json
{
    "dbURI": "mongodb://username:password@localhost/Asthionablog",
    "port": "3000",
    "client_id": "DISCORD CLIENT ID",
    "client_secret": "DISCORD CLIENT SECRET",
    "client_redirect": "/auth/redirect",
    "secret": "Shhhhht! That's a secret! used to ecrypt cookie and stuff"
}
```
and tada! it run on `localhost:3000`