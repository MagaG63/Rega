const { Op } = require('sequelize');
const { Order } = require('../../db/models');

class OrderService {
  static getAll() {
    return Order.findAll();
  }

 static getById(id) {
    return Order.findByPk(id)
  }

   static getByCompany(company) {
    return Order.findAll({ where: { company: { [Op.iLike]: `%${company}%` } } })
  }

  
static async update(id, data){
    const order = await Order.findByPk(id) 

    await order.update(data) 
    return order
}

  static create(data) {
    return Order.create(data)
  }


  static async delete(id) {
    return Order.destroy({ where: { id } });
  }
}

module.exports = OrderService
