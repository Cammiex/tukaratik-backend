const express = require('express');
const router = express.Router();
const wasteController = require('../controllers/wasteController');

router.get('/', wasteController.getAllWaste);
router.post('/', wasteController.upload, wasteController.addWaste);
router.put('/:id', wasteController.upload, wasteController.updateWaste);
router.delete('/:id', wasteController.deleteWaste);
router.put('/:id/shipping-status', wasteController.updateShippingStatus);
router.get('/:id', wasteController.getWasteById);
router.get('/:id/date', wasteController.getWasteDate);
router.get('/:id/address', wasteController.getWasteAddress);
router.get('/:id/type', wasteController.getWasteType);
router.get('/:id/points-awarded', wasteController.getPointsAwarded);
router.get('/:id/status', wasteController.getShippingStatus);
router.get('/:userId/history', wasteController.getWasteHistory);

module.exports = router;
