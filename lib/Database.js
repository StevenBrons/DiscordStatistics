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
    return foo;
  }

  /**
   * Delete a guild member
   * @param {Discord.guildMember} guildMember
   */
  async _deleteGuildMember(guildMember) {
    await this.connection.query('DELETE FROM `users` WHERE `id` = ? AND `guildId` = ?', [
      guildMember.id,
      guildMember.guild.id,
    ]);
  }

  /**
   * Insert guild member
   * @param {Discord.guildMember} guildMember
   */
  async _insertGuildMember(guildMember) {
    await this.connection.query(`INSERT INTO \`users\` (
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
      ]);
  }
}

module.exports = Database;
