import { IEdificioPersistence } from '../../dataschema/IEdificioPersistence';
import mongoose from 'mongoose';

const edificioSchema = new mongoose.Schema({
    domainId: {
      type: String,
      unique: true,
    },
    codigo: {
      type: String,
      validate: {
        validator: function (value) {
          return /^[A-Za-z0-9\s]{1,5}$/.test(value);
        },
        message: 'ID must be up to 5 characters long and contain only letters, numbers, or spaces in the middle.',
      },
    },
    nome: {
      type: String,
      maxlength: 50,
    },
    descricao: {
      type: String,
      maxlength: 255,
    },
    pisoMaxSize: {
        type: String,
        validate: {
            validator: function (value) {
              return /^[0-9]+x[0-9]+$/.test(value);
            },
            message: 'PisoMaxSize should be in the format "length x width".',
          },
      },
  },
  { timestamps: true },
  );
  
export default mongoose.model<IEdificioPersistence & mongoose.Document>('Edificio', edificioSchema);