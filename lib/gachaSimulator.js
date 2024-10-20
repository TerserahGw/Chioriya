const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const rewardsFilePath = path.join(__dirname, '../database/rewards.json');
const historyFilePath = path.join(__dirname, '../database/history.json');
const pityFilePath = path.join(__dirname, '../database/pity.json');
const inventoryFilePath = path.join(__dirname, '../database/inventory.json');

let cachedRewards = null;

function loadJSON(filePath) {
  try {
    return JSON.parse(readFileSync(filePath, 'utf8'));
  } catch (err) {
    return [];
  }
}

function saveJSON(filePath, data) {
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function loadRewards() {
  if (!cachedRewards) {
    cachedRewards = loadJSON(rewardsFilePath);
  }
  return cachedRewards;
}

function refreshRewardsCache() {
  cachedRewards = loadJSON(rewardsFilePath);
}

let rewards = loadRewards();
let history = loadJSON(historyFilePath);
let pityData = loadJSON(pityFilePath);
let inventory = loadJSON(inventoryFilePath);

function getRandomReward(rarity) {
  const filteredRewards = rewards.filter(r => r.rarity === rarity);
  return filteredRewards[Math.floor(Math.random() * filteredRewards.length)];
}

function rollChance(chance) {
  return Math.random() * 100 < chance;
}

function gacha(userId, times = 1) {
  const pity = pityData[userId] || { pityB4Random: 0, pityB4Character: 0, pityB5: 0, islimitGuarantee: false };
  let results = [];
  
  if (!history[userId]) {
    history[userId] = [];
  }

  for (let i = 0; i < times; i++) {
    pity.pityB4Random += 1;
    pity.pityB4Character += 1;
    pity.pityB5 += 1;

    let reward = null;

    if (pity.pityB5 >= 90 || rollChance(1.2)) {
      if (pity.islimitGuarantee) {
        reward = rewards.find(r => r.rarity === 'B5' && r.islimit);
      } else {
        reward = getRandomReward('B5');
        if (rollChance(50)) {
          reward.islimit = true;
        } else {
          reward.islimit = false;
          pity.islimitGuarantee = true;
        }
      }

      const currentPityB5 = pity.pityB5;
      results.push({ rarity: reward.rarity, name: reward.name, ischaracter: reward.ischaracter, pity: currentPityB5 });

      history[userId].push({ rarity: reward.rarity, name: reward.name, pity: currentPityB5 });

      pity.pityB5 = 0;
    } else if (pity.pityB4Character >= 20) {
      reward = rewards.find(r => r.rarity === 'B4' && r.ischaracter);
      results.push({ rarity: reward.rarity, name: reward.name, ischaracter: reward.ischaracter, pity: pity.pityB5 });

      history[userId].push({ rarity: reward.rarity, name: reward.name, pity: pity.pityB5 });

      pity.pityB4Character = 0;
    } else if (pity.pityB4Random >= 10) {
      reward = getRandomReward('B4');
      results.push({ rarity: reward.rarity, name: reward.name, ischaracter: reward.ischaracter, pity: pity.pityB5 });

      history[userId].push({ rarity: reward.rarity, name: reward.name, pity: pity.pityB5 });

      pity.pityB4Random = 0;
    } else {
      if (rollChance(5.1)) {
        reward = getRandomReward('B4');
        results.push({ rarity: reward.rarity, name: reward.name, ischaracter: reward.ischaracter, pity: pity.pityB5 });

        history[userId].push({ rarity: reward.rarity, name: reward.name, pity: pity.pityB5 });

        pity.pityB4Random = 0;
        pity.pityB4Character = 0;
      } else {
        reward = getRandomReward('B3');
        results.push({ rarity: reward.rarity, name: reward.name, ischaracter: reward.ischaracter, pity: pity.pityB5 });

        history[userId].push({ rarity: reward.rarity, name: reward.name, pity: pity.pityB5 });
      }
    }

    let itemInInventory = inventory[userId]?.find(item => item.name === reward.name);
    if (itemInInventory) {
      itemInInventory.jumlah += 1;
    } else {
      if (!inventory[userId]) inventory[userId] = [];
      inventory[userId].push({
        name: reward.name,
        rarity: reward.rarity,
        ischaracter: reward.ischaracter,
        jumlah: 1
      });
    }

    if (reward.rarity === 'B5' && reward.islimit) {
      pity.islimitGuarantee = false;
    }
  }

  pityData[userId] = pity;
  saveJSON(pityFilePath, pityData);
  saveJSON(historyFilePath, history);
  saveJSON(inventoryFilePath, inventory);

  return results;
}

function rwdGacha(action, data) {
  if (action === 'add') {
    const newId = rewards.length + 1;
    rewards.push({ id: newId, ...data });
    saveJSON(rewardsFilePath, rewards);
    refreshRewardsCache();
    return rewards.find(r => r.id === newId);
  } else if (action === 'dell') {
    rewards = rewards.filter(r => r.id !== data.id);
    saveJSON(rewardsFilePath, rewards);
    refreshRewardsCache();
  } else if (action === 'list') {
    let filteredRewards = rewards;

    if (data?.rarity) {
      const rarities = data.rarity.split(' ');
      filteredRewards = filteredRewards.filter(r => rarities.includes(r.rarity));
    }

    if (data?.islimit !== undefined) filteredRewards = filteredRewards.filter(r => r.islimit === data.islimit);
    if (data?.ischaracter !== undefined) filteredRewards = filteredRewards.filter(r => r.ischaracter === data.ischaracter);
    
    return filteredRewards;
  }
}

function inventoryGacha(userId) {
  return inventory[userId] || [];
}

function historyGacha(userId, filterRarity = 'All') {
  let userHistory = history[userId] || [];
  if (filterRarity !== 'All') {
    userHistory = userHistory.filter(entry => entry.rarity === filterRarity);
  }
  return userHistory;
}

module.exports = {
  gacha,
  historyGacha,
  rwdGacha,
  inventoryGacha
};
