import { ISalaPersistence } from '../../dataschema/ISalaPersistence';
import mongoose from 'mongoose';

const salaSchema = new mongoose.Schema({
    domainId: {
      type: String,
      unique: true,
    },
    nome: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
    },
    descricao: {
      type: String,
      maxlength: 250,
    },
    categoria: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^gabinete|anfiteatro|laboratorio|outro$/.test(value);
        },
        message: 'Category must be one of the following: fabinete / anfiteatro / laboratorio / outro.',
      },
    },
    tamanho: {
        type: String,
        required: true,
        min: 1,
    },
    edificio: {
      type: mongoose.Schema.Types.String,
      ref: 'Edificio',
      required: true,
    },
    piso: {
      type: mongoose.Schema.Types.String,
      ref: 'Piso',
      required: true,
    },
  },
  { timestamps: true },
  );
  
export default mongoose.model<ISalaPersistence & mongoose.Document>('Sala', salaSchema);