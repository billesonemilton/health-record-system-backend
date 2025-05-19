const { getDb } = require('../config/db');

class RegionalHealthAuthorityService {
  async createRegionalHealthAuthority(data) {
    const db = await getDb();
    const query = `
      INSERT INTO RegionalHealthAuthority SET
        authorityId = :authorityId,
        name = :name,
        region = :region,
        contactEmail = :contactEmail,
        phone = :phone
    `;
    return await db.command(query, { params: data }).one();
  }

  async findAll() {
    const db = await getDb();
    return await db.select().from('RegionalHealthAuthority').all();
  }

  async findById(id) {
    const db = await getDb();
    return await db.select().from('RegionalHealthAuthority').where({ '@rid': id }).one();
  }

  async update(id, data) {
    const db = await getDb();
    return await db.update(id).set(data).return('AFTER').one();
  }

  async delete(id) {
    const db = await getDb();
    return await db.delete().from('RegionalHealthAuthority').where({ '@rid': id }).one();
  }
}

module.exports = new RegionalHealthAuthorityService();
