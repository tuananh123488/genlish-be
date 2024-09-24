'use strict'
const gateModel = require('../models/gate.model')

class GateService {

    create = async (gate) => {
        const gateCreated = await gateModel.create(gate)
        return gateCreated
    }

    getAll = async () => {
        const gates = await gateModel.find()
        return gates
    }

}

module.exports = new GateService()