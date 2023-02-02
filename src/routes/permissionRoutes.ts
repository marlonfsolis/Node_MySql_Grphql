import {Router} from "express";

import * as PermissionController from "../controllers/permissionController";
import {permissionValidator} from "../models/PermissionModel";


const router = Router();

/* GET permissions. */
router.get('/', PermissionController.getPermissions);

/* POST a permission_queries */
router.post('/', permissionValidator(), PermissionController.createPermission);

/* PUT a permission_queries */
router.put('/:name', permissionValidator(), PermissionController.updatePermission);

/* DELETE a permission_queries */
router.delete('/:name', PermissionController.deletePermission);

/* GET a permission_queries */
router.get('/:name', PermissionController.getPermission);

// export const usersRoutes = router;
export default router;
