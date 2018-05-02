const mysql = require('promise-mysql');

class Database {
  async connect(connectionArgs) {
    this.connection = await mysql.createConnection(connectionArgs);
  }

  /**
   * Add a user to the db, overwrite if it already exists.
   * @param {Discord.guildMember} user
   */
  async setGuildMember(guildMember) {
    await this._deleteGuildMember(guildMember);
    await this._insertGuildMember(guildMember);
  }

  /**
   * Delete a guild member
   * @param {Discord.guildMember} guildMember
   */
  async _deleteGuildMember(guildMember) {
    await this.connection.query('DELETE FROM `guildmembers` WHERE `id` = ? AND `guildId` = ?', [
      guildMember.id,
      guildMember.guild.id,
    ]);
  }

  /**
   * Insert guild member
   * @param {Discord.guildMember} guildMember
   */
  async _insertGuildMember(guildMember) {
    await this.connection.query(`INSERT INTO \`guildmembers\` (
        id,
        guildId,
        discriminator,
        avatar,
        displayName,
        joinedAt,
        color,
        bot
      ) VALUES (?,?,?,?,?,?,?,?)`, [
        guildMember.id,
        guildMember.guild.id,
        guildMember.user.discriminator,
        guildMember.user.avatarURL,
        guildMember.displayName,
        guildMember.joinedAt,
        guildMember.displayHexColor,
        guildMember.user.bot,
      ]);
  }

  /**
   * Add a user to the db, overwrite if it already exists.
   * @param {Discord.guildMember} guildMember
   */
  async addPresence(guildMember) {
    await this.connection.query(`INSERT INTO \`presence\` (
      userId,
      status,
      game
    ) VALUES (?,?,?)`, [
      guildMember.id,
      guildMember.presence.status,
      guildMember.presence.game ? guildMember.presence.game.name : null,
    ]);
  }

  /**
   * Add a user to the db, overwrite if it already exists.
   * @param {Discord.guild} guild
   */
  async setGuild(guild) {
    await this._deleteGuild(guild);
    await this._insertGuild(guild);
  }


  /**
   * Add a user to the db, overwrite if it already exists.
   * @param {Discord.guild} guild
   */
  async _insertGuild(guild) {
    await this.connection.query(`INSERT INTO \`guilds\` (
      id,
      ownerId,
      name,
      memberCount,
      created,
      region,
      splash,
      iconUrl
    ) VALUES (?,?,?,?,?,?,?,?)`, [
      guild.id,
      guild.ownerID,
      guild.name,
      guild.memberCount,
      guild.createdAt,
      guild.region,
      guild.splash,
      guild.iconURL,
    ]);
  }

  /**
   * Delete a guild member
   * @param {Discord.guild} guild
   */
  async _deleteGuild(guild) {
    await this.connection.query('DELETE FROM `guilds` WHERE `id` = ?', [
      guild.id,
    ]);
  }

}

module.exports = Database;
