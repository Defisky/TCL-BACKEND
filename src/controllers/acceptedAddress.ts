import { Response, Request, json } from "express";
import { AcceptedAddress } from '../models/accepted_address';

import BadRequestError from "../exceptions/BadRequestError";

import * as luxon from 'luxon';

export const getEthAddressCount = async (req: Request, res: Response) => {

	try {
		const t1 = await AcceptedAddress.countDocuments({tier: 1});
    const t2 = await AcceptedAddress.countDocuments({tier: 2});
    const t3 = await AcceptedAddress.countDocuments({tier: 3});
		return res.status(200).send({
      t1, t2, t3
    });
	}
	catch (error) {
		console.error(error);
		return res.status(400).send(new BadRequestError("Bad Request"));
	}
};

export const getTier = async (req: Request, res: Response) => {

	try {
		let id: string = req.params.id;
		const data = await AcceptedAddress.findById(id);
    if (data) {
      return res.status(200).send({tier: data.tier});
    } else {
      return res.status(200).send({tier: '0'});
    }
	}
	catch (error) {
		console.error(error);
		return res.status(400).send(new BadRequestError("Bad Request"));
	}
};

export const addEthAddresses = async (req: Request, res: Response) => {
	try {
		const { tier, addressList } = req.body;

    const addressArray = addressList.split(',');
    console.log(addressArray)
    for(const item of addressArray) {
      const existingData = await AcceptedAddress.findById(item);
      if (existingData) {
        existingData.tier = tier;
        await existingData.save();
      } else {
        const data = new AcceptedAddress();
        data._id = item;
        data.tier = tier;
        data.joined_platform = luxon.DateTime.utc().toString();
        await data.save();
      }
    }
		return res.status(201).send({status: 'ok'});
	}
	catch (error) {
    console.log(error);
		if (error.code === 11000) {
			return res.status(400).send(new BadRequestError("ID and/or username already exist."));
		}
		else {
			console.error(error);
			return res.status(400).send(new BadRequestError("Bad Request."));
		}
	}
};

export const removeEthAddresses = async (req: Request, res: Response) => {
  const { addressList } = req.body;

  const addressArray = addressList.split(',');
  console.log(addressArray)
  for(const item of addressArray) {
    try {
      await AcceptedAddress.findByIdAndRemove(item);
    } catch (e) {
      console.log(item);
    }
  }
  return res.status(201).send({status: 'ok'});
};
