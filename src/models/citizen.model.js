class Citizen {
  constructor({ nationalId, name, dateOfBirth, gender, phone }) {
    this.nationalId = nationalId;
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.phone = phone;
  }
}

module.exports = Citizen;
