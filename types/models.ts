import { Document, Types } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string,
  firstName?: string;
  lastName?: string;
  role: Role
};

export enum Role {
  User = 'user',
  Admin = 'admin'
};

export interface Attachment extends Document {
  name: string,
  path: string,
  description: string,
  user: Types.ObjectId,
  createdAt: Date,
};