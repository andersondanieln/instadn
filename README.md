![plot](./resources/img/logo_banner.png)

# INSTADN

An easy way to post to Instagram via code using Puppeteer.
The goal of this project is to be as simple and intuitive as possible, and of course, to be functional.
See how easy it is to post:

### Example 1.1

    const instdn = require('instdn');
    
    let insta = new instdn(user, pass);
    
    await insta.login();
    
    await insta.postImg(
    { 
    path: './example.png', 
    description: 'Anderhex is a nice guy! #Brazil' 
    }
    );

### Example 1.2
You will also be able to obtain information about your user profile, see how:

    const instdn = require('instdn');
    let insta = new instdn(user, pass);
        insta.login();
    let profile = insta.getProfile();
 
All progress will be announced in your Terminal.
     
