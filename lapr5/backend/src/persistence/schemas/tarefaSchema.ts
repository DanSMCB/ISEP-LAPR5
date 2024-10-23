import { ITarefaPersistence } from '../../dataschema/ITarefaPersistence';
import mongoose from 'mongoose';

const tarefaSchema = new mongoose.Schema({
    domainId: {
      type: String,
      unique: true
    },
    codigo: {
      type: String,
      unique: true,
      required: true
    },
    descricao: {
      type: String,
      maxlength: 255,
      required: true
    },
    robot: {
        type: mongoose.Schema.Types.String,
        ref: 'Robot',
        required: true
    },
    tipoDeRobot: {
      type: mongoose.Schema.Types.String,
      ref: 'TipoDeRobot',
      required: true
    },
    estado: {
      type: String,
      validate: {
          validator: function (value) {
          return /^aprovada|nao aprovada| $/.test(value);
          },
          message: 'Estado must be aprovada or nao aprovada.',
        },
      required: false
    },
    contactoRequisitante: {
      type: String,
      required: true
    },
    tipoDeTarefa: {
        type: String,
        validate: {
            validator: function (value) {
            return /^vigilancia|entrega de objetos$/.test(value);
            },
            message: 'Task must be vigilancia or entrega de objetos.',
          },
        required: true
    },

    // No caso de se tratar de uma tarefa do tipo: vigilancia
    contactoIncidente: {
        type: String,
        maxlength: 25,
        required: false
    },
    edificio: {
        type: mongoose.Schema.Types.String,
        ref: 'Edificio',
        required: false
    },
    pisos: [{
        piso: {
          type: mongoose.Schema.Types.String,
          ref: 'Piso',
          required: false
        }
    }],

    // No caso de se tratar de uma tarefa do tipo: entrega de objetos
    salaRecolha: {
        type: mongoose.Schema.Types.String,
        ref: 'Sala',
        required: false
    },
    salaEntrega: {
        type: mongoose.Schema.Types.String,
        ref: 'Sala',
        required: false
    },   
    contactoRecolha: {
        type: String,
        maxlength: 25,
        required: false
    },
    contactoEntrega: {
        type: String,
        maxlength: 25,
        required: false
    }
  },
  { timestamps: true },
  );

export default mongoose.model<ITarefaPersistence & mongoose.Document>('Tarefa', tarefaSchema);