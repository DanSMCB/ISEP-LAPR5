import { ITipoDeRobotPersistence } from '../../dataschema/ITipoDeRobotPersistence';
import mongoose from 'mongoose';

const tipoDeRobotSchema = new mongoose.Schema({
    domainId: {
      type: String,
      unique: true,
    },
    descricao: {
      type: String,
      maxlength: 25,
      required: true,
      validate: {
          validator: function (value) {
          return /^robisep|droneisep$/.test(value);
          },
          message: 'Robot type must be robisep or droneisep.',
      },
    },
    tarefas: [{
      tarefa: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
        return /^vigilancia|entrega de objetos$/.test(value);
        },
        message: 'Task must be vigilancia or entrega de objetos.',
      },
    },
    }]
  });

export default mongoose.model<ITipoDeRobotPersistence & mongoose.Document>('TipoDeRobot', tipoDeRobotSchema);