import HttpError from "../models/http-error";
import RealEstate from "../models/RealEstate";
import Agent from "../models/Agent";
import mongoose from "mongoose";

export const newRealEastate = async (req, res, next) => {
  const { name, address, price, agent } = req.body;
  const newRealEstate = new RealEstate({
    name,
    address,
    price,
    agent,
  });

  let agentData;

  try {
    agentData = await Agent.findById(agent);
  }
  catch (err) {
    return next(new HttpError('Can\'t find correct user.', 500));
  }

  try {
    console.log(newRealEstate);
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newRealEstate.save({ session: sess });
    agentData.realEstates.push(newRealEstate);
    await agentData.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError('Creating real estate failed, please try again.', 500));
  }

  res.status(201).json({ realEstate: newRealEstate });
}

export const deleteRealEstate = async (req, res, next) => {
  const realEstateId = req.params.id;
  let realEstate;

  try {
    realEstate = await RealEstate.findById(realEstateId).populate('agent');
  } catch (err) {
    return next(new HttpError('Can\'t find real estate.', 500));
  }

  if (!realEstate) {
    return next(new HttpError('Could not find real estate for this id.', 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await RealEstate.deleteOne(realEstate, { session: sess });
    realEstate.agent.realEstates.pull(realEstate._id);
    await realEstate.agent.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError('Something went wrong, could not delete real estate.', 500));
  }

  res.json({ message: 'Deleted real estate.' });
}

export const updateRealEstate = async (req, res, next) => {
  const realEstateId = req.params.id;
  const { title, description, price } = req.body;
  let realEstate;

  try {
    realEstate = await RealEstate.findById(realEstateId);
  } catch (err) {
    return next(new HttpError('Something went wrong, could not update real estate.', 500));
  }

  if (!realEstate) {
    return next(new HttpError('Could not find real estate for this id.', 404));
  }

  realEstate.title = title;
  realEstate.description = description;
  realEstate.price = price;
  realEstate.agent = req.agent.id;

  try {
    await realEstate.save();
  } catch (err) {
    return next(new HttpError('Something went wrong, could not update real estate.', 500));
  }

  res.json({ realEstate });
}

export const getRealEstateById = async (req, res, next) => {
  let realEstate;

  try {
    realEstate = await RealEstate.findById(req.params.id);
  } catch (err) {
    return next(new HttpError('Fetching real estate failed, please try again later.', 500));
  }

  res.json({ realEstate: realEstate.toObject({ getters: true }) });
}

export const getAgentRealEstates = async (req, res, next) => {
  let realEstates;

  try {
    realEstates = await RealEstate.find({ agentId: req.body.agentId });
  } catch (err) {
    return next(new HttpError('Fetching real estates failed, please try again later.', 500));
  }

  res.json({ realEstates: realEstates.map((realEstate) => realEstate.toObject({ getters: true })) });
}
