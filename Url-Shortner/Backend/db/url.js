import { urlSchema } from "../models/url.js";
async function createURL({ short_id, redirect_url }) {
  try {
    const urlRecord = await urlSchema.create({
      short_id,
      redirect_url,
      visit_count: 0,
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

export { createURL, getandUpadteUrlRecordFromShortId };
