const { checkPerformance } = require('./creative-generator');
const POLL_INTERVAL = parseInt(process.env.POLL_INTERVAL_MINUTES || '15') * 60 * 1000;
async function pollMetaAds() {
  console.log('[Monitor] Checking Meta Ads performance...');
  const mockData = require('../mock-data/sample-meta-ads-response.json');
  await checkPerformance(mockData.campaigns);
}
setInterval(pollMetaAds, POLL_INTERVAL);
pollMetaAds();
