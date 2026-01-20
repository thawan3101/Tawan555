const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
const ytdl = require("ytdl-core");

// ====== ใส่ TOKEN ของคุณตรงนี้ ======
const TOKEN = "MTQ2Mjc5NzY1Mjc3NjQ1NjIxMg.GoDx2_.amyxykhWOf39u9QZCnSgAer9OiQY8DvrsIllRY";
// ===================================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.once("ready", () => {
  console.log(`✅ บอทออนไลน์แล้ว: ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // คำสั่งเปิดเพลง
  if (message.content.startsWith("!เล่น")) {
    if (!message.member.voice.channel) {
      return message.reply("❌ เข้าห้องเสียงก่อนครับ");
    }

    const url = message.content.split(" ")[1];
    if (!url || !ytdl.validateURL(url)) {
      return message.reply("❌ ใส่ลิงก์ YouTube ให้ถูกต้องนะครับ");
    }

    const connection = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator
    });

    const stream = ytdl(url, { filter: "audioonly", highWaterMark: 1 << 25 });
    const player = createAudioPlayer();
    const resource = createAudioResource(stream);

    player.play(resource);
    connection.subscribe(player);

    message.reply("🎵 กำลังเปิดเพลงให้ครับ");
  }

  // คำสั่งให้ออก
  if (message.content === "!ออก") {
    if (message.guild.members.me.voice.channel) {
      message.guild.members.me.voice.disconnect();
      message.reply("👋 ออกห้องเสียงแล้วครับ");
    }
  }
});

client.login(TOKEN);
