/*
 *
 *  Instadn!
 *  @author: Anderson D.
 *  @github: anderhex
 *  @date: 06/2022
 *  @license: MIT
 * 
 */
const fs = require('fs').promises;
const puppeteer = require('puppeteer');

class Instadn {
    constructor(user, pass) {
        this.errList = {
            notLogged: "\n> You must be logged in to perform this function."
        };
        this.isLogged = false;
        this.user = user;
        this.pass = pass;
        this.baseUrl = "https://www.instagram.com/accounts/login/";
        console.log('\n> Ready to login! ');
    }

    async login() {
        console.log('\n> Logging in...');
        this.browser = await puppeteer.launch({ headless: true });
        this.page = await this.browser.newPage();
        this.profile = "no_profile";
        await this.page.emulate(puppeteer.devices['Pixel 5']);
        await this.openCookies();
        await this.page.goto(this.baseUrl);
        await this.page.waitFor(3000);
        let check = await this.checkLogin();
        if (!check) {
            console.log('\m> Logging in with username and password', check);
            this.profile = await this.doLogin();
        } else {
            console.log('\n> Logged in using cookies!');
            this.profile = await this.getProfile();
            this.isLogged = true;
        }
        if (this.isLogged) {
            console.log(`\n> Welcome ${ this.profile.username}`);
            await this.page.waitForSelector('div[role="dialog"]');
            await this.page.evaluate(() => {
                document.querySelector('div[role="dialog"]').querySelectorAll('button')[1].click();
            });


        } else {
            console.log(this.errList.notLogged);
            return;
        }
    }
    async getProfile() {
        this.notLoggedCheck();
        this.profile = "";
        try {
            this.profile = await this.page.evaluate(() => {
                return Object.entries(window._sharedData.config.viewer).reduce(
                    (obj, item) => ({
                        ...obj,
                        [item[0]]: item[1]
                    }), {}
                );
            });
        } catch (e) {
            return this.profile;
        }
        return this.profile;
    }
    async checkLogin() {
        this.profile = "";
        this.profile = await this.getProfile();
        this.isLogged = this.profile == "" ? false : true;
        return this.isLogged;
    }
    async openCookies() {
        try {
            const cookiesString = await fs.readFile('./cookies.json');
            const cookies = JSON.parse(cookiesString);
            await this.page.setCookie(...cookies);
            return;
        } catch (e) { return false }
    }
    async doLogin() {
        this.profile = "";
        try {
            await this.page.waitForSelector('button');
            await this.page.evaluate(() => {
                document.querySelectorAll('button')[1].click();
            })
            await this.page.waitForSelector('input[type="text"]');
            await this.page.type('input[type="text"]', this.user);
            await this.page.waitFor(3000);
            await this.page.type('input[type="password"]', this.pass);
            await this.page.waitFor(3000);
            await this.page.click('button[type="submit"]');
            await this.page.waitFor(3000);
            let error = await this.page.evaluate(() => {
                let errElem = document.getElementById('slfErrorAlert');
                return errElem ? errElem.innerText : "";
            })
            if (error == "") {
                console.log('\n> Login successful!');
                this.isLogged = true;
                console.log('\n> Waiting next steps...');
                await this.page.waitFor(3000);
                await this.page.evaluate(() => {
                    document.querySelectorAll('button')[1].click();
                });
                await this.page.waitForNavigation();
                this.profile = await this.getProfile(this.page);
                console.log('\n> Saving cookies...');
                const cookies = await this.page.cookies();
                await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));

            } else {
                console.error('\n> Erro: \n' + error);
                return;
            }


        } catch (e) {
            return false;
        }
        return this.profile;
    }
    notLoggedCheck() { if (!this.isLogged) { console.log(this.errList.notLogged); return; } }
    async uploadImg(obj) {
        this.notLoggedCheck();
        if (!this.isLogged) {
            console.log(errList.notLogged);
            return false;
        }
        this.page = obj.this.page;
        let path = obj.path;
        let description = obj.description;
        console.log('\nTrying to open image selector');
        let futureFileChooser = this.page.waitForFileChooser();
        await this.page.waitForSelector('div[role="menuitem"]')
        await this.page.click('div[role="menuitem"]');
        let fileChooser = await futureFileChooser;
        await fileChooser.accept([path]);


    }
    async postImg(obj) {
        this.notLoggedCheck();
        let path = obj.path;
        let description = obj.description;
        console.log('\n> Trying to open image selector');
        let futureFileChooser = this.page.waitForFileChooser();
        await this.page.waitForSelector('div[role="menuitem"]');
        await this.page.click('div[role="menuitem"]');
        console.log('\n> Trying to open image file.');
        let fileChooser = await futureFileChooser;
        await fileChooser.accept([path]);
        await this.page.waitForSelector('h1[tabindex="-1"]');
        console.log('\n> Trying to write you description.');


        await this.page.evaluate(() => {
            document.querySelector('h1[tabindex="-1"]').parentNode.querySelectorAll('button')[1].click();
        });
        await this.page.waitForNavigation();
        await this.page.waitForSelector('textarea');
        await this.page.type('textarea', description);
        console.log('\n> Posting... :)))');
        await this.page.waitForSelector('h1[tabindex="-1"]');
        await this.page.evaluate(() => {
            document.querySelector('h1[tabindex="-1"]').parentNode.querySelectorAll('button')[1].click();
        });
        console.log("\n> I'ts done, baby!");
        this.browser.close();

    }


}



module.exports = Instadn;