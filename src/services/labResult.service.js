const getDb = require('../config/db').getDb;

class LabResultService {
  async createLabResult(data) {
    const db = getDb();
    const query = `
      INSERT INTO LabResult SET
        labResultId = :labResultId,
        patientId = :patientId,
        testName = :testName,
        result = :result,
        date = :date,
        notes = :notes
    `;
    return await db.command(query, { params: data }).one();
  }

  async getAllLabResults() {
    const db = getDb();
    return await db.select().from('LabResult').all();
  }

  async getLabResultById(id) {
    const db = getDb();
    return await db.select().from('LabResult').where({ '@rid': id }).one();
  }

  async updateLabResult(id, data) {
    const db = getDb();
    return await db.update(id).set(data).return('AFTER').one();
  }

  async deleteLabResult(id) {
    const db = getDb();
    return await db.delete().from('LabResult').where({ '@rid': id }).one();
  }
}

module.exports = new LabResultService();
