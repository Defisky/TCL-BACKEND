import { Router } from 'express';

import * as acceptedAddress from './controllers/acceptedAddress';

const router: Router = Router();

router.post('/add-ethaddress', acceptedAddress.addEthAddresses);
router.get('/ethaddress-count', acceptedAddress.getEthAddressCount);
router.get('/get-tier/:id', acceptedAddress.getTier);

export default router;