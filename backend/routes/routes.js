import express from 'express';
import authToken from '../middleware/authToken.js';
import userLogout from '../controller/userLogout.js';
import userLogin from '../controller/userLogin.js';
import userRegister from '../controller/userRegister.js';
import buyTicket from '../controller/BuyTicketController.js';
import getUserTickets from '../controller/myTicketController.js';
import startJourney from '../controller/journeyController.js';
import completeJourney from '../controller/completeJourney.js';
const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin)
router.post('/logout', authToken, userLogout);
router.post('/buy-ticket', authToken , buyTicket);
router.get('/my-ticket', authToken, getUserTickets);
router.post('/start-journey', authToken, startJourney);
router.post('/complete-journey', authToken, completeJourney);
export default router;