import express from 'express';
import cookieParser from 'cookie-parser';
import cors = require('cors');

import authRoutes from './routes/authRoutes';
import organizationRoutes from './routes/organizationRoutes';
import searchRoutes from './routes/searchRoutes';
import memberRoutes from './routes/memberRoutes';
import qualificationRoutes from './routes/qualificationRoutes';
import customRoutes from './routes/customRoutes';
import eventRoutes from './routes/eventRoutes';
import awardRoutes from './routes/awardRoutes';
import groupRoutes from './routes/groupRoutes';
import profileRoutes from './routes/UserProfileRoutes';

const app = express();
const port = 3001;
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
    let message1: string = 'Server started on port 3001';
    let message2: string = 'Welcome to the server!';
    res.send(message1 + message2);
});

app.use('/auth', authRoutes);

app.use('/organization', organizationRoutes);
app.use('/search', searchRoutes);
app.use('/member', memberRoutes);
app.use('/qualification', qualificationRoutes);
app.use('/custom', customRoutes);
app.use('/event', eventRoutes);
app.use('/award', awardRoutes);
app.use('/group', groupRoutes);
app.use('/profile', profileRoutes);

app.listen(port, () => {
    console.log('Server is running on http://localhost:3001')
});