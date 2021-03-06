import {IAttachment} from './base/i.attachment';
import {AttachementModel} from './models/attachement.model';

export class AttachementManager implements IAttachment {

  db: any;

  constructor(db: any) {
    this.db = db;
  }

  delete(...args): any {
  }

  async get(_id: any, name: any): Promise<any> {
    return await this.db.getAttachment(_id, name);
  }

  async save(attachement: AttachementModel): Promise<any> {
    try {
      const blob = new Blob([attachement.content], {type: attachement.type});
      const result = await this.db.putAttachment(attachement.docId, attachement.attachmentId, blob, attachement.type);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

}
