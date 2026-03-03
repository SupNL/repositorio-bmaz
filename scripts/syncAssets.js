// scripts/generateAssetsJson.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// ---------- CONFIGURATION ----------
// Change these paths if needed
const ASSETS_BASE_PATH = 'public/assets';
const MAIN_TOPICS_PATH = 'src/static/mainTopics.json';
const PER_TOPIC_MAP_PATH = 'src/static/perTopicMap.json';
// -----------------------------------

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const assetsBase = path.join(rootDir, ASSETS_BASE_PATH);
const mainTopicsFile = path.join(rootDir, MAIN_TOPICS_PATH);
const perTopicMapFile = path.join(rootDir, PER_TOPIC_MAP_PATH);

/**
 * Simple placeholder label generator from a key (e.g., "crazy_train" -> "Crazy Train")
 */
function keyToLabel(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Reads a JSON file, returns its parsed content or a default (empty array/object)
 */
async function readJson(file, defaultValue) {
  try {
    const data = await fs.readFile(file, 'utf-8');
    return JSON.parse(data);
  } catch {
    return defaultValue;
  }
}

/**
 * Writes a JSON file with pretty formatting
 */
async function writeJson(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2) + '\n');
  console.log(`Updated ${path.relative(rootDir, file)}`);
}

async function main() {
  console.log('Scanning assets folder...');

  // Read existing JSONs
  const oldMainTopics = await readJson(mainTopicsFile, []);
  const oldPerTopicMap = await readJson(perTopicMapFile, {});

  // Build lookup maps for existing labels
  const topicLabelMap = new Map(
    oldMainTopics.map((item) => [item.key, item.label])
  );

  const newMainTopics = [];
  const newPerTopicMap = {};

  // Get all topic folders
  let topicDirs;
  try {
    topicDirs = await fs.readdir(assetsBase, { withFileTypes: true });
  } catch (err) {
    console.error(`Assets folder not found: ${assetsBase}`);
    process.exit(1);
  }

  // Process each topic in alphabetical order for consistent output
  const topicEntries = topicDirs
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .sort();

  for (const topicKey of topicEntries) {
    const topicPath = path.join(assetsBase, topicKey);
    const songDirs = await fs.readdir(topicPath, { withFileTypes: true });

    const songs = songDirs
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .sort();

    if (songs.length === 0) continue; // skip topics with no songs

    // Topic label
    const topicLabel = topicLabelMap.get(topicKey) ?? 'LABEL FALLBACK'; // fallback to key itself
    newMainTopics.push({ label: topicLabel, key: topicKey });

    const topicSongs = {};
    for (const songKey of songs) {
      const songPath = path.join(topicPath, songKey);
      const files = await fs.readdir(songPath, { withFileTypes: true });

      // Only include files (not subdirectories) as assets
      const assetFiles = files
        .filter((dirent) => dirent.isFile())
        .map((dirent) => dirent.name)
        .sort();

      if (assetFiles.length === 0) continue; // skip songs with no assets

      // Song label – preserve old, else generate placeholder
      const oldSong = oldPerTopicMap[topicKey]?.[songKey];
      const songLabel = oldSong?.label ?? 'LABEL_PLACEHOLDER';

      const assets = [];
      for (const fileName of assetFiles) {
        // Asset label – preserve old if same file exists
        const oldAsset = oldSong?.assets?.find((a) => a.file === fileName);
        const assetLabel = oldAsset?.label ?? 'LABEL_PLACEHOLDER';
        assets.push({ label: assetLabel, file: fileName });
      }

      topicSongs[songKey] = { label: songLabel, assets };
    }

    if (Object.keys(topicSongs).length > 0) {
      newPerTopicMap[topicKey] = topicSongs;
    }
  }

  // Write updated JSONs
  await writeJson(mainTopicsFile, newMainTopics);
  await writeJson(perTopicMapFile, newPerTopicMap);

  console.log('Done.');
}

main().catch(console.error);