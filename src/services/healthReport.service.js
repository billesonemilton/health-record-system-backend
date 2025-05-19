const db = require('../config/db');

class HealthReportService {
  async createHealthReport(data) {
    const query = `
      INSERT INTO HealthReport (reportId, title, summary, createdAt, createdBy)
      VALUES (:reportId, :title, :summary, :createdAt, :createdBy)
    `;
    return await db.command(query, { params: data }).one();
  }

  async findAll() {
    return await db.select().from('HealthReport').all();
  }

  async findById(id) {
    return await db.select().from('HealthReport').where({ '@rid': id }).one();
  }

  async update(id, data) {
    return await db.update(id).set(data).return('AFTER').one();
  }

  async delete(id) {
    return await db.delete().from('HealthReport').where({ '@rid': id }).one();
  }
}

module.exports = new HealthReportService();
