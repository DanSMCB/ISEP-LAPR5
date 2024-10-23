import mongoose from 'mongoose';
import { IRobotPersistence } from '../../dataschema/IRobotPersistence';

const robotSchema = new mongoose.Schema({
    domainId: {
      type: String,
      unique: true,
    },
    numeroSerie: {
      type: String,
      unique: true,
      required: true,
    },
    codigo: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      maxlength: 50,
      required: true,
    },
    marca: {
      type: String,
      maxlength: 255,
      required: true,
    },
    estado: {
      type: String,
      required: true,
    },
    tipoDeRobot: {
      type: mongoose.Schema.Types.String,
      ref: 'TipoDeRobot',
      required: true,
    },
  },
  { timestamps: true },
  );
  
export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', robotSchema);