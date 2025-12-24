const OrderService = require("../serivces/order.services");

class OrdersController {
  static async getAllOrder(req, res) {
    const { search } = req.query;

    if (!search) {
      const order = await OrderService.getAll();
      return res.json(order)
    }

    const order = await OrderService.getByCompany(search)
    return res.json(order)
  }

  static async getOneOrder(req, res) {
    const { id } = req.params;
    const order = await OrderService.getById(id);

    const { user } = res.locals;

    if (order.userId !== user.id) {
      return res.sendStatus(403);
    }

    if (!order) {
      return res.sendStatus(404);
    }
    return res.json(order)
  }

  static async createOrder(req, res) {

    const data = req.body;


    const order = await OrderService.create({ ...data, userId: res.locals.user.id });

    res.status(201).json(order)
  }

  static async deleteOrder(req, res) {
    const { user } = res.locals;
    const { id } = req.params;

    const order = await OrderService.getById(id);

    if (!order) {
      return res.sendStatus(404);
    }

    console.log(order)

    if (order.userId !== user.id) {
      return res.sendStatus(403);
    }

    await OrderService.delete(id);
    return res.sendStatus(204)
  }

      static async updateOrder(req,res){
          const { id } = req.params 
    const data = req.body


    
    const card = await OrderService.update(id, data)
  return  res.status(200).json(card)
    }
}

module.exports = OrdersController