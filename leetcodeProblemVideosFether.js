// save as fetchLeetCodeVideos.js
// Node 18+ (global fetch). Set env YT_API_KEY=your_key

const YT_API = "https://www.googleapis.com/youtube/v3/search";
const CHANNELS = {
  neetcode: "UC_mYaQAE6-71rjSN6CeCA-g", // NeetCode
  algorithmist: "UCl3tJFKsFrw2p_Wxf1YDSow", // Programming Live with Larry (@Algorithmist)
};

async function searchChannelVideo(channelId, query, maxResults = 1) {
  const params = new URLSearchParams({
    key: "AIzaSyDfgktaofBTPlL0lR3l2vZyTxWDNTPZxv0",
    part: "snippet",
    type: "video",
    maxResults: String(maxResults),
    q: query,
    channelId, // restrict to specific channel
    order: "relevance",
  });

  const res = await fetch(`${YT_API}?${params.toString()}`);
  if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
  const data = await res.json();

  const first = data.items?.[0];
  if (!first?.id?.videoId) return null;
  return `https://www.youtube.com/watch?v=${first.id.videoId}`;
}

/**
 * getTwoVideos("LeetCode 1 Two Sum solution")
 * -> { neetcode: "https://...", algorithmist: "https://..." }
 */
async function getTwoVideos(problemQuery) {
  const [neet, algo] = await Promise.all([
    searchChannelVideo(CHANNELS.neetcode, problemQuery, 1).catch(() => null),
    searchChannelVideo(CHANNELS.algorithmist, problemQuery, 1).catch(
      () => null
    ),
  ]);

  // Always include Algorithmist if found; include NeetCode only if found.
  const result = {};
  if (neet) result.neetcode = neet;
  if (algo) result.algorithmist = algo;

  // If NeetCode missing but Algorithmist is present, you still get 1 link (per your rule).
  // If both missing, return empty object.
  return result;
}

// Example run: node fetchLeetCodeVideos.js "LeetCode 1 Two Sum solution"
const q =
  process.argv.slice(2).join(" ").trim() || "LeetCode 3525 Find X value of Array II";
getTwoVideos(q)
  .then((out) => {
    console.log(JSON.stringify({ query: q, ...out }, null, 2));
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

// test

// module.exports = { getTwoVideos };
