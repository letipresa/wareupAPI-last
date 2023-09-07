const enums = require('../utils/enums');
const { DepositModel, CityModel, CompanyModel, ServiceModel, DepartmentModel } = require("../database"); 
const DepositServiceModel = require('../models/depositService.model');

class DepositRepository {
  constructor(logRepository){
    this.log = logRepository;
    this.model = DepositModel;
  }

  async create(request){
    try { 
        return this.model.create(request);
    }
    catch (error) {
      this.log.create('Error in create: '+error, enums.logsType.database);
    }
    return null;
  }

  async update(request) {
    try { 
        return this.model.update(
          { 
            status: request.status,
            title: request.title,
            description: request.description,
            totalM3: request.totalM3,
            currency: request.currency,
            cityId: request.cityId,
            minimumBusinessPeriod: request.minimumBusinessPeriod ,
            minimumBusinessVolume: request.minimumBusinessVolume,
            expectedPrice: request.expectedPrice,
            street: request.street,
            postalCode: request.postalCode
          },
          {
            where: { id : request.id}
          });
    }
    catch (error) {
      this.log.create('Error in update: '+ error, enums.logsType.database);
    }
    return null;
  }

  async get(id){
    try {
      return this.model.findOne({
        where: {id: id},
        include: [CompanyModel,
          {
            model: CityModel,
            include: [DepartmentModel]
          }, DepositServiceModel]
      });
    }
    catch (error) {
      this.log.create('Error in get: '+error, enums.logsType.database);
    }
    return null;
  }

  async getByCompany(companyId) {
    try {
      return await this.model.findAll({
        where: {companyId: companyId},
        include: [CompanyModel,
          {
            model: CityModel,
            include: [DepartmentModel]
          }, DepositServiceModel]
      });
    }
    catch (error) {
      this.log.create('Error in getByCompany: '+error, enums.logsType.database);
    }

    return null;
  }

  async getByFilter(filterOptions) {
    try {
      return await this.model.findAll({
        include: [CompanyModel,
          {
            model: DepositServiceModel,
            //where: { serviceId: filterOptions.servicesId },
            include: [ServiceModel]
          },
          {
            model: CityModel,
            include: [{ model: DepartmentModel, where: { title:  { [Op.like]: filterOptions.city } } } ],
            where: { title:  { [Op.like]: filterOptions.city}
            }
          }] 
      });
    }
    catch (error) {
      this.log.create('Error in getByFilter: '+error, enums.logsType.database);
    }

    return null;
  }

  async getAll() {
    try {
      return await this.model.findAll({
        include: [CompanyModel,
          {
            model: CityModel,
            include: [DepartmentModel]
          }, DepositServiceModel]});
    }
    catch (error) {
      this.log.create('Error in getAll: '+error, enums.logsType.database);
    }

    return null;
  }

  async getByUser(userId) {
    try {
      return await this.model.findAll({
        where: {userId: userId},
        include: [CompanyModel, {model: CityModel, include: [DepartmentModel]}, DepositServiceModel]
      });
    }
    catch (error) {
      this.log.create('Error in getByUser: '+error, enums.logsType.database);
    }

    return null;
  }

}

module.exports = DepositRepository;