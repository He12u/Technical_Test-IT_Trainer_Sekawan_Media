const { Employee, User } = require("../models");

class employeeController {
  static async getEmployes(req, res, next) {
    try {
      const employes = await Employee.findAll();
      res.status(200).json(employes);
    } catch (error) {
      next(error);
    }
  }

  static async getApprovers(req, res, next) {
    try {
      const approvers = await User.findAll({
        where: {
          role: "approver",
        },
        attributes: {
          exclude: ["username", "password", "role", "createdAt", "updatedAt"],
        },
      });
      // const approvers = await Employee.findAll();
      res.status(200).json(approvers);
    } catch (error) {
      next(error);
    }
  }
  // end employee controller
}

module.exports = employeeController;
