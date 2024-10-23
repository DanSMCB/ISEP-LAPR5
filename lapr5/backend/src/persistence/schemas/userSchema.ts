import { IUserPersistence } from '../../dataschema/IUserPersistence';
import mongoose from 'mongoose';
const organizationDomain = process.env.ORGANIZATION_DOMAIN || 'isep.ipp.pt';

const User = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    firstName: {
      type: String,
      required: [true, 'Insira o primeiro nome'],
      index: true,
    },

    lastName: {
      type: String,
      required: [true, 'Insira o último nome'],
      index: true,
    },

    email: {
      type: String,
      validate: {
        validator: function (value) {
          return new RegExp(`^[a-z0-9._%+-]+@${organizationDomain}$`, 'i').test(value);
        },
        message: 'Formato inválido. São apenas aceites emails da organização.',
      },
      unique: true,
      index: true,
    },

    password: {
      type: String,
      validate: {
        validator: function (value) {
          return meetsComplexityCriteria(value);
        },
        message: 'Formato inválido. A password deve ter 1 maiúscula, 1 minúscula, 1 dígito, 1 símbolo e um mínimo de 10 carateres.',
      },
      index: false,
    },

    role: {
      type: String,
      validate: {
        validator: function (value) {
        return /^administrador-sistema|gestor-campus|gestor-frota|gestor-tarefas|utente$/.test(value);
        },
        message: 'Apenas existem os cargos: "administrador-sistema", "gestor-campus", "gestor-frota", "gestor-tarefas", "utente".',
      },
      required: true,
    },

    phone: {
      type: String,
      validate: {
        validator: function (value) {
          return /^[2,9][0-9]{2}[0-9]{3}[0-9]{3}$/.test(value);
        },
        message: 'Formato do número de telefone inválido.',
      },
      required: true,
      unique: true,
    },

    taxpayer: {
      type: String,
      validate: {
        validator: function (value) {
          return /^[1-9]\d{8}$|^---$|^$/.test(value);
        },
        message: 'Formato do número de contribuinte inválido.',
      },
    },

    state: {
      type: String,
      validate: {
          validator: function (value) {
          return /^aprovado|nao aprovado|pendente$/.test(value);
          },
          message: 'State must be "", "aprovado" or "nao aprovado".',
        },
      required: true
    },
  },
  { timestamps: true },
);

function meetsComplexityCriteria(value: string): boolean {
  // Mínimo 10 caracteres
  if (value.length < 10) {
    return false;
  }

  // Pelo menos 1 letra maiúscula
  if (!/[A-Z]/.test(value)) {
    return false;
  }

  // Pelo menos 1 letra minúscula
  if (!/[a-z]/.test(value)) {
    return false;
  }

  // Pelo menos 1 dígito
  if (!/\d/.test(value)) {
    return false;
  }

  // Pelo menos 1 símbolo
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    return false;
  }

  return true;
}

export default mongoose.model<IUserPersistence & mongoose.Document>('User', User);
