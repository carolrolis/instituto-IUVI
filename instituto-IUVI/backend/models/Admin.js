import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: String,
  password: String // Em produção, use hash!
});

export default mongoose.model('Admin', adminSchema);