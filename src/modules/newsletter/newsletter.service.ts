import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { NewsletterNewsEntity } from './newsletter-news.entity';
import { NewsletterTipsEntity } from './newsletter-tips.entity';
import { UpdateNewsletterdto } from './newsletter.dto';
import { NewsletterEntity } from './newsletter.entity';
import { MMBService } from '../morning-market-buzz/morning-market-buzz.service'
import { OMWService } from '../overnight-market-wrap/overnight-market-wrap.service'

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(NewsletterEntity)
    private readonly NewsletterRepository: Repository<NewsletterEntity>,
    @InjectRepository(NewsletterNewsEntity)
    private readonly NewsletterNewsRepository: Repository<NewsletterNewsEntity>,
    @InjectRepository(NewsletterTipsEntity)
    private readonly NewsletterTipsRepository: Repository<NewsletterTipsEntity>,
    private mmbService: MMBService,
    private omwService: OMWService
  ) { }

  async getNewsletter(): Promise<NewsletterEntity> {
      const data = await this.NewsletterRepository.query("SELECT status, title, content, img_id, img_link, CONVERT_TZ(last_update, '+00:00', '+07:00') as last_update from mqwarrantscms.mq_email_info WHERE id = 1");
      return data[0];
  }

  async getNewsletterTips(): Promise<NewsletterTipsEntity[]> {
    return await this.NewsletterTipsRepository.find({ select: ['id', 'link'] });
  }

  async getNewsletterNews(): Promise<NewsletterNewsEntity[]> {
    return await this.NewsletterNewsRepository.find({ select: ['id', 'img_link'] });
  }

  async updateSendStatus(): Promise<UpdateResult> {
    return await this.NewsletterRepository.createQueryBuilder()
      .update()
      .set({ status: 1 })
      .where('id = 1')
      .andWhere('status = 0')
      .execute();
  }

  async updateNewsletter(data: UpdateNewsletterdto): Promise<UpdateResult> {
    if (data.tipsfile) {
      await this.NewsletterTipsRepository.createQueryBuilder()
        .insert()
        .values({ image: Buffer.from(data.tipsfile), link: data.img_link })
        .execute();

      var newsletterTipsRepository = await this.NewsletterTipsRepository.createQueryBuilder()
        .select([
          'id'
        ])
        .orderBy("id", "DESC")
        .limit(1)
        .getRawOne();

      data.img_id = newsletterTipsRepository.id
    }

    if (data.newsfile) {
      await this.NewsletterNewsRepository.createQueryBuilder()
        .insert()
        .values({ image: Buffer.from(data.newsfile), img_link: data.img_link })
        .execute();

      var newsletterTipsRepository = await this.NewsletterNewsRepository.createQueryBuilder()
        .select([
          'id'
        ])
        .orderBy("id", "DESC")
        .limit(1)
        .getRawOne();

      data.news_img_id = newsletterTipsRepository.id
    }

    if (!data.tipsfile) {
      await this.NewsletterTipsRepository.createQueryBuilder()
        .update()
        .set({ link: data.img_link })
        .where('id = :id', { id: data.img_id })
        .execute();
    }

    if (!data.newsfile) {
      await this.NewsletterNewsRepository.createQueryBuilder()
        .update()
        .set({ img_link: data.img_link })
        .where('id = :id', { id: data.news_img_id })
        .execute();
    }


    var content = await this.updateNewsletterContent(data.option, data.img_id, data.img_link);
    return await this.NewsletterRepository.createQueryBuilder()
      .update()
      .set({
        title: data.title,
        content: content,
        img_id: data.img_id,
        last_update: new Date(),
      })
      .where('id = 1')
      .execute();
  }

  async deleteNewsletterTips(id: number): Promise<DeleteResult> {
    return await this.NewsletterTipsRepository.createQueryBuilder()
      .delete()
      .where('id = :id', { id: id })
      .execute();
  }

  async deleteNewsletterNews(id: number): Promise<DeleteResult> {
    return await this.NewsletterNewsRepository.createQueryBuilder()
      .delete()
      .where('id = :id', { id: id })
      .execute();
  }

  async updateNewsletterContent(option: string, img_id: number, img_link: string): Promise<string> {
    var propertiesReader = require('properties-reader');
    var properties = propertiesReader('./src/newsletter.properties');
    var website_link = properties.get('website_link');
    var cms_link = properties.get('cms_link');
    var cms_api_link = properties.get('cms_api_link');

    //var website_link = "https://t12a.trkd-hs.com/sg/";
    //var cms_link = "https://t12a.trkd-hs.com/sg_cms/";
    //var cms_api_link = "https://t12a.trkd-hs.com/cmsapimqsg/";
    var content = "";
    var result = "";
    var fs = require('fs');
    const file = fs.readFileSync('./src/modules/newsletter/template/newsletter.html', 'utf-8');
    content = file;
    var contents = content.split("{split}")
    result += contents[0];
    if (option == "0") {
      var mmbdata = await this.mmbService.getLatestTitle();
      result += contents[1].replace("{section-content-title}", mmbdata.en_title);
      result += contents[3].replace("{section-content}", mmbdata.en_short_content)
        .replace("{Read_more}", "marketnews/highlight/todayhighlight/" + mmbdata.id);
    } else {
      result += contents[4].replace("{news_link}", img_link)
        .replace("{news_src}", "file/image/news/" + img_id);
    }
    result += contents[5].replace("{img_link}", img_link)
      .replace("{img_src}", "file/image/tips/" + img_id);
    var omwdata = await this.omwService.getLatestTitle();
    result += contents[6].replace("{section-content-title}", omwdata.en_title)
      .replace("{section-content}", omwdata.en_short_content)
      .replace("{Read_more}", "marketnews/highlight/overnightmarkets/" + omwdata.id);
    result = result.replace(/{website_link}/gi, website_link).replace(/{cms_link}/gi, cms_link).replace(/{cms_api_link}/gi, cms_api_link);
    return result;
  }

}
