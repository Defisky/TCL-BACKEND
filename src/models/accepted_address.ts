import mongoose from 'mongoose'

interface Dictionary<T> {
  [key: string]: T;
}

interface IAcceptedAddress {
  _id: string,
  tier: number;
  joined_platform: string,
}

interface acceptedAddressModelInterface extends mongoose.Model<AcceptedAddressDoc> {
  build(attr: IAcceptedAddress): AcceptedAddressDoc
}

interface AcceptedAddressDoc extends mongoose.Document {
  _id: string,
  tier: number;
  joined_platform: string,
}

const AcceptedAddressSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  tier: {
    type: Number,
    required: true,
  },
  joined_platform: {
    type: String,
    required: true
  },
})

AcceptedAddressSchema.statics.build = (attr: IAcceptedAddress) => {
  return new AcceptedAddress(attr)
}

const AcceptedAddress = mongoose.model<AcceptedAddressDoc, acceptedAddressModelInterface>('AcceptedAddress', AcceptedAddressSchema)



export { AcceptedAddress }




