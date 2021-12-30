const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');


var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//-----------------------------------------------KOMUTLAR-------------------------------------------------\\


  
client.on("guildMemberAdd", async (member) => {
  member.roles.add(ayarlar.kayitsiz)
  member.setNickname("✫ İsim | Yaş")
  });
  
  
  
  
client.on("ready", () => {
  client.channels.cache.get("801788823704829994").join();
});
  
  
  
 //-----------------------HOŞ-GELDİN-MESAJI----------------------\\ 



client.on("guildMemberAdd", async (member) => {
  var Unregister = ayarlar.kayitsiz;
  await member.roles.add(Unregister).catch(e => console.log(e))
  }
  );


client.on('guildMemberAdd', async member => { 
  await member.setNickname(`✫ İsim | Yaş`)
 let user = client.users.cache.get(member.id);
let zaman = new Date().getTime() - user.createdAt.getTime()
var takizaman = [];
if(zaman < 604800000) {
takizaman = '• Tehlikeli'
} else {
takizaman = `• Güvenli`}require("moment-duration-format");
 let zaman1 = new Date().getTime() - user.createdAt.getTime()
 const gecen = moment.duration(zaman1).format(` YY [Yıl,] DD [Gün,] HH [Saat,] mm [Dakika,] ss [Saniye]`) 
 let dbayarfalanfilan = await db.fetch(`takidbayar.${member.guild.id}`)
 let message = member.guild.channels.cache.find(x => x.id === `925361542818590769`)
  const taki = new Discord.MessageEmbed()
 .setTitle(
     "VİANA'ya Hoşgeldin"
   )
   .setDescription(`
╔▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
║► **・** **Sunucumuza Hoş geldin** ${member} 
║   
║► **・Seninle Beraber** ${member.guild.memberCount} **Kişiyiz**
║
║► **・** **Kaydının Yapılması İçin İsmini ve Yaşını Yaz**
║
║► **・** **Ailemize Katılmak İçin ve Kayıt Olmak İçin** **(** \`✫\` **)** **Tagımızı Almalısın.**
║
║► **・**<@&926047910913789963> **Rolündeki Yetkililer Seninle İlgilenecektir**
║
║► **・** **Hesap Açılalı** ${gecen} **Olmuş**
║
║► **・** **Bu Kullanıcı** **|** **${takizaman}**
╚▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
`)
.setImage('https://media.discordapp.net/attachments/713795753490907217/715815335638466690/Main_Render.gif')
.setColor('BLACK')
message.send(taki)
 }); 

  
//-----------------------HOŞ-GELDİN-MESAJI----------------------\\   
    
//------------------------------------------------------------------------------------------------------------------------------------\\
  
  client.on("guildMemberAdd", member => {
      var moment = require("moment")
      require("moment-duration-format")
      moment.locale("tr")
       var {Permissions} = require('discord.js');
       var x = moment(member.user.createdAt).add(7, 'days').fromNow()
       var user = member.user
       x = x.replace("birkaç saniye önce", " ")
       if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
       const kytsz = member.guild.roles.cache.find(r => r.id === (ayarlar.kayitsiz)) 
       var rol = member.guild.roles.cache.get(ayarlar.şüpheli) 
       var jail = member.guild.roles.cache.get(ayarlar.jailRol)
       var kayıtsız = member.guild.roles.cache.get(kytsz) 
       member.roles.add(rol)
       member.roles.remove(kytsz)
  
    member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
    setTimeout(() => {
    
    }, 1000)
    
    
       }
            else {
    
            }
        });
  
  //------------------------------------------------------------------------------------------------------------------------------------\\

  //-----------------------OTO-TAG-----------------------\\     

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    
  var tag = (ayarlar.tag); 
  var sunucu = client.guilds.cache.get(ayarlar.Guild); 
  var rol = (ayarlar.tagRol); 
  var kanal = (ayarlar.tagLog); 


  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} \`${tag}\` **Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim**`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**Selam** \`${newUser.username}\`, **Sunucumuzda** \`${tag}\` **Tagımızı Aldığın İçin** \`${client.guilds.cache.get(sunucu).roles.cache.get(rol).name}\` **Rolünü Sana Verdim!**`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} \`${tag}\` **Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım**`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**Selam** \`${newUser.username}\`, **Sunucumuzda** \`${tag}\` **Tagımızı Çıkardığın İçin** \`${client.guilds.cache.get(sunucu).roles.cache.get(rol).name}\` **Rolünü Ve Diğer Rolleri Senden Aldım!**`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});

  
  //-----------------------TAG-ROL----------------------\\     
  
  client.on("userUpdate", async (member, yeni) => {
    var sunucu = client.guilds.cache.get(ayarlar.Guild); 
    var uye = sunucu.members.cache.get(yeni.id);
    var tag = (ayarlar.tag); 
    var tagrol = (ayarlar.tagRol); 
    var logKanali = (ayarlar.tagLog); 
  
    if (!sunucu.members.cache.has(yeni.id) || yeni.bot || member.username === yeni.username) return;
    
    if ((yeni.username).includes(tag) && !uye.roles.cache.has(tagrol)) {
      try {
        await uye.roles.add(tagrol);
        await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
        await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
      } catch (err) { console.error(err) };
    };
    
    if (!(yeni.username).includes(tag) && uye.roles.cache.has(tagrol)) {
      try {
        await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(tagrol).position));
        await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
        await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
      } catch(err) { console.error(err) };
    };
  });
  //-----------------------TAG-ROL----------------------\\   
  
  //----------------------TAG-KONTROL----------------------\\     
  
  client.on("guildMemberAdd", member => {
    let sunucuid = (ayarlar.guild); 
    let tag = (ayarlar.tag); 
    let rol = (ayarlar.tagRol); 
  if(member.user.username.includes(tag)){
  member.roles.add(rol)
    const tagalma = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`)
        .setTimestamp()
       client.channels.cache.get(ayarlar.tagLog).send(tagalma)
  }
  })
  
  //-----------------------TAG-KONTROL----------------------\\  
  
  client.on('message', msg => {
    if (msg.content === prefix + 'tag') {
      msg.channel.send('✫');
    }
  });
  
  client.on('message', msg => {
    if (msg.content === 'tag') {
      msg.channel.send('✫');
    }
  });
  
  
  client.on('message', msg => {
    if (msg.content === '!tag') {
      msg.channel.send('✫');
    }
  });
  
  client.on('message', msg => {
    if (msg.content === '-tag') {
      msg.channel.send('✫');
    }
  });