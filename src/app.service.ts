/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
import { ElementHandle } from 'puppeteer';
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

@Injectable()
export class AppService {
  private logger = new Logger('ScrapService');

  async archCheck() {
    (async () => {
      const loginId = '1234';
      const loginPass = '1234';

      // 브라우저를 실행한다.
      // 옵션으로 headless모드를 끌 수 있다.
      // true -> 브라우저 안보임
      const browser = await puppeteer.launch({
        // args: ['--lang=ko-KR'],
        slowMo: 50,
        headless: false,
        // args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'],
      });

      // 새로운 페이지를 연다.
      const page = await browser.newPage();

      // 페이지의 크기를 설정한다.
      await page.setViewport({
        width: 1920,
        height: 1080,
      });

      await page.goto(
        'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%95%84%ED%82%A4%EC%97%90%EC%9D%B4%EC%A7%80',
      );

      // 네이버 검색 후 공식 사이트 이동
      let target =
        '#main_pack > section.sc_new.cs_common_module._cs_newgame.case_normal.color_10 > div.cm_content_wrap.cm_game > div:nth-child(1) > div > div.detail_info > dl > div:nth-child(5) > dd > a:nth-child(2)';
      await page.waitForSelector(target);
      let t1 = await page.$(target);
      t1.click();
      await page.waitFor(3000);
      // console.log('waitForNav');

      // 스크린샷
      const pages = await browser.pages();
      const newTab = pages[2];

      // 다시 보지 않기 클릭
      let target2 = 'body > div > div > a';
      await newTab.waitForSelector(target2);
      let t2 = await newTab.$(target2);
      t2.click();

      // LOGIN
      let loginBanner = '#account_util > div.xlgames-login > a';
      await newTab.waitForSelector(loginBanner);
      let loginLink = await newTab.$(loginBanner);
      // print(loginLink.toString());
      console.log(loginLink);
      loginLink.click();

      // 입력
      let loginIdSelector = '#id_field';
      let loginPasswdSelector = '#pw_field';
      let loginClickSelector = '#loginButton';

      await newTab.waitForSelector(loginIdSelector);
      let formId = await newTab.$(loginIdSelector);
      await formId.type(loginId);

      await newTab.waitForSelector(loginPasswdSelector);
      let formPass = await newTab.$(loginPasswdSelector);
      await formPass.type(loginPass);

      await newTab.waitForSelector(loginClickSelector);
      let formClick = await newTab.$(loginClickSelector);
      await formClick.click();
      await newTab.waitForNavigation({ waitUntil: 'networkidle2' });

      // 배너 클릭 후 선물 받기
      let checkBannerSelector = '#main-container > div.wing-aside > a';
      await newTab.waitForSelector(checkBannerSelector);
      let banner = await newTab.$(checkBannerSelector);
      await banner.click();
      await newTab.waitForNavigation({ waitUntil: 'domcontentloaded' });

      // X-PATH
      //<iframe id="eventFrame" src="" frameborder="0" allowfullscreen="true" style="width: 100%; height: 3400px;" xpath="1"></iframe>
      // const elementHandle = await page.$("iframe[src='https://archeage.nexon.com/events/2019/search']");
      const elementHandle = await page.$("iframe[id='eventFrame']");
      // let giftSelector = "//a[contains(text(),'선물 받기')]";
      const giftSelector = await elementHandle.contentFrame();

      // await newTab.waitForSelector(giftSelector);
      // let gift = await newTab.$(giftSelector);
      await giftSelector.click();

      // NON XPATH
      // let giftSelector = 'body > div.event-wrap > div.section3 > div > a';
      // await newTab.waitForSelector(giftSelector);
      // let gift = await newTab.$(giftSelector);
      // await gift.click();

      // const newTab2 = newTab;
      // console.log(pages);
      // const navigationPromise = newTab.waitForNavigation({ waitUntil: 'domcontentloaded' });
      // await navigationPromise;
      // let giftSelector = 'body > div.event-wrap > div.section3 > div > a';
      // await newTab.waitForSelector(giftSelector);
      // let gift = await newTab.$(giftSelector);
      // await gift.click();

      // await newTab.$eval(giftSelector, (element) => element.click());
      // await gift.click();
      console.log(`${loginId} 완료`);
    })();
  }

  // async interParkTiket() {
  //   (async () => {
  //     const id = 'shinelazy';
  //     const passwd = 'vrs6&232';

  //     // 브라우저를 실행한다.
  //     // 옵션으로 headless모드를 끌 수 있다.
  //     // true -> 브라우저 안보임
  //     const browser = await puppeteer.launch({
  //       args: ['--lang=ko-KR'],
  //       // env: { LANGUAGE: "fr_FR" } }),
  //       headless: false,
  //     });

  //     // 새로운 페이지를 연다.
  //     const page = await browser.newPage();
  //     await page.setExtraHTTPHeaders({
  //       'Accept-Language': 'ko',
  //     });
  //     // 페이지의 크기를 설정한다.
  //     await page.setViewport({
  //       width: 1366,
  //       height: 768,
  //     });
  //     await page.goto(
  //       'https://ticket.interpark.com/Gate/TPLogin.asp?CPage=B&MN=Y&tid1=main_gnb&tid2=right_top&tid3=login&tid4=login',
  //     );

  //     // html 받아오는거 찍어보기
  //     const content = await page.content();
  //     const $ = cheerio.load(content);
  //     // console.log(content);

  //     // const work_price = this.scrapReplace($, content, '#loginWrap');
  //     // console.log(work_price);

  //     // 기다림
  //     await page.waitForSelector('#userId');
  //     await page.waitForSelector('#userPwd');
  //     page.waitFor(3500);
  //     //입력
  //     await page.type('#userId', id);
  //     await page.type('#userPwd', passwd);
  //     //클릭
  //     await page.click('#btn_login');

  //     await browser.close();

  //     // return lists;
  //   })();
  // }
}
