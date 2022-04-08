/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

@Injectable()
export class AppService {
  private logger = new Logger('ScrapService');

  async interParkTiket() {
    (async () => {
      const id = 'kimpu';
      const passwd = 'passwd!!';

      // 브라우저를 실행한다.
      // 옵션으로 headless모드를 끌 수 있다.
      // true -> 브라우저 안보임
      const browser = await puppeteer.launch({
        headless: false,
      });

      // 새로운 페이지를 연다.
      const page = await browser.newPage();

      // 페이지의 크기를 설정한다.
      await page.setViewport({
        width: 1366,
        height: 768,
      });
      await page.goto(
        'https://ticket.interpark.com/Gate/TPLogin.asp?CPage=B&MN=Y&tid1=main_gnb&tid2=right_top&tid3=login&tid4=login',
      );

      // html 받아오는거 찍어보기
      const content = await page.content();
      const $ = cheerio.load(content);
      console.log(content);

      // 기다림
      await page.waitForSelector('#userId');
      await page.waitForSelector('#userPwd');
      //입력
      await page.type('#userId', id);
      await page.type('#userPwd', passwd);
      //클릭
      await page.click('#btn_login');

      await browser.close();

      // return lists;
    })();
  }
}
