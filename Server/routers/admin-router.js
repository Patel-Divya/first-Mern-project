const express = require('express');
const {getAllUsers, getAllContacts, getAllServices} = require('../Controllers/admin-controller');
const router = express.Router();
const authMiddlware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const adminController = require('../Controllers/admin-controller');

router.route('/users').get(authMiddlware, adminMiddleware, getAllUsers);
router.route('/users/:id').get(authMiddlware, adminMiddleware, adminController.getUserById);
router.route('/users/update/:id').patch(authMiddlware, adminMiddleware, adminController.uppdateUserById);
router.route('/contacts').get(authMiddlware, adminMiddleware, getAllContacts);
router.route('/contacts/delete/:id').delete(authMiddlware, adminMiddleware, adminController.daleteContactById);
router.route('/services').get(authMiddlware, adminMiddleware, getAllServices);
router.route('/users/delete/:id').delete(authMiddlware, adminMiddleware, adminController.deleteUserById)

module.exports = router;