import { NextFunction } from "express";
import HttpError from "../models/http-error";
import Agent from "../models/Agent";
import fileUpload from '../middleware/file-upload';

type Agent = {
  name: string;
  email: string;
  password: string;
  id: string;
};

const agents = [
  {
    name: 'John Doe',
    email: 'email1@mail.com',
    password: 'password',
    id: '1',
  },
  {
    name: 'Jane Doe',
    email: 'email2@mail.com',
    password: 'password',
    id: '2',
  },
  {
    name: 'John Smith',
    email: 'email3@mail.com',
    password: 'password',
    id: '3',
  },
];

export const getAgentsList = async (req, res, next: NextFunction) => {
  try {
    const agents = await Agent.find();

    if (!agents || agents.length === 0) {
      return next(new HttpError('Agents not found :(', 404));
    }

    res.json(agents);
  } catch (err) {
    return next(new HttpError('Fetching agents failed, please try again later.', 500));
  }
};

export const getAgent = async (req, res, next: NextFunction) => {
  const agentId = req.params.id;

  try {
    const agent = await Agent.findById(agentId);

    if (!agent) {
      return next(new HttpError('Agent not found :(', 404));
    }

    res.json(agent);
  } catch (err) {
    return next(new HttpError('Fetching agent failed, please try again later.', 500));
  }
};

export const updateAgent = (req, res, next) => {
  const agentId = req.params.id;
  const { name, email } = req.body;
  const agent = agents.find((agent) => agent.id === agentId);

  if (agent) {
    agent.name = name;
    agent.email = email;

    res.json(agent);
  } else {
    return next(new HttpError('Agent not found :(', 404));
  }
};

export const deleteAgent = (req, res, next): void => {
  const agentId = req.params.id;
  const agentIndex = agents.findIndex((agent) => agent.id === agentId);

  agents.splice(agentIndex, 1);

  res.json(agents);
};

export const login = async(req, res, next) => {
  const { email, password } = req.body;
  const agent = await Agent.findOne({ email: email });

  if (!agent) {
    return res.status(404).json({ message: 'Agent not found :(' });
  }

  if (agent.password === password) {
    res.json({ message: 'Login successful!' });
  } else {
    return next(new HttpError('Invalid password :(', 401));
  }
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!req.file) {
    return next(new HttpError('No photo uploaded :(', 422));
  }

  const existingAgent = await Agent.findOne({ email: email });

  if (existingAgent) {
    return next(new HttpError('Agent already exists :(', 422));
  }

  console.log(req.file);

  const newAgent = new Agent({
    name,
    email,
    password,
    photo: req.file.path,
    realEstates: [],
  });

  try {
    await newAgent.save();
    res.status(201).json(newAgent);
  } catch (err) {
    return next(new HttpError('Signing up failed :(', 500));
  }
};
