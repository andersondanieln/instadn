<p align="center">
<img src="./resources/img/logo.png" style="display:block; padding:20px"/>
</p>


An easy way to post to Instagram using JavaScript with Puppeteer.
The goal of this project is to be as simple and intuitive as possible, and of course, to be functional.

### Post

    const instdn = require('instdn');
    
    let insta = new instdn(user, pass);
    
    await insta.login();
    
    await insta.postImg(
    { 
    path: './example.png', 
    description: 'Anderhex is a nice guy! #Brazil' 
    }
    );

Instadn will save session cookies to use again in the future. Don't worry, it switches between cookie and login automatically.

### Profile
You will also be able to obtain information about your user profile, see how:

    const instdn = require('instdn');
    let insta = new instdn(user, pass);
        insta.login();
    let profile = insta.getProfile();
 
All progress will be announced in your Terminal.

## <i>PT-BR:</i>

Uma forma fácil de postar no Instagram via código usando Puppeteer.
A máxima deste projeto é se manter simples, intuitivo e funcional. 

### Postando uma imagem

    const instdn = require('instdn');
    
    let insta = new instdn(user, pass);
    
    await insta.login();
    
    await insta.postImg(
    { 
    path: './example.png', 
    description: 'Anderhex is a nice guy! #Brazil' 
    }
    );

O Instadn salvará automaticamente os cookies da sessão em um arquivo JSON, nas futuras execuções ele alternará automaticamente entre
logar utilizando cookies ou seu usuário e senha. 

### Obtenha informações do perfil

    const instdn = require('instdn');
    
    let insta = new instdn(user, pass);
    
    await insta.login();
    
    await insta.postImg(
    { 
    path: './example.png', 
    description: 'Anderhex is a nice guy! #Brazil' 
    }
    );


