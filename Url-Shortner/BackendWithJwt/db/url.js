import { urlSchema } from "../models/url.js";
async function createURL({ short_id, redirect_url, user_id }) {
  try {
    const urlRecord = await urlSchema.create({
      short_id,
      redirect_url,
      visit_count: 0,
      created_by: user_id,
    });
    return urlRecord;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getandUpadteUrlRecordFromShortId({ short_id }) {
  try {
    const urlRecord = await urlSchema.findOne({ where: { short_id } });
    if (urlRecord) {
      urlRecord.set({ visit_count: urlRecord.visit_count + 1 });
      await urlRecord.save();
    }
    return urlRecord;
  } catch (err) {
    throw err;
  }
}

async function getAllUrlRecords() {
  try {
    const allUrlRecords = await urlSchema.findAll({});
    return allUrlRecords;
  } catch (err) {
    throw err;
  }
}

async function getAllUrlsByUserId(user_id) {
  try {
    const userUrls = await urlSchema.findAll({
      where: { created_by: user_id },
    });
    return userUrls;
  } catch (err) {
    throw err;
  }
}
export {
  createURL,
  getandUpadteUrlRecordFromShortId,
  getAllUrlRecords,
  getAllUrlsByUserId,
};
