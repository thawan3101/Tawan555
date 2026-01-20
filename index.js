const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

const PREFIX = "m!";

client.on("ready", () => {
  console.log("Bot is online");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "play") {
    const query = args.join(" ");
    if (!query) return message.reply("❌ ใส่ลิงก์หรือชื่อเพลงด้วย");
    return message.reply(`🎵 กำลังจะเปิดเพลง: ${query}`);
  }

  if (command === "skip") {
    return message.reply("⏭️ ข้ามเพลงแล้ว");
  }

  if (command === "leave") {
    return message.reply("👋 ออกจากห้องเสียงแล้ว");
  }

  if (command === "setup") {
    return message.reply("⚙️ ระบบตั้งค่า (ยังไม่เปิด)");
  }
});

client.login(process.env.DISCORD_TOKEN);
