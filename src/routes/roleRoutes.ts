import {Router} from "express";

import * as RoleController from "../controllers/roleController";
import {roleValidator} from "../models/RoleModel";


const router = Router();

/* GET roles. */
router.get('/', RoleController.getRoles);

/* POST a role_queries */
router.post('/', roleValidator(), RoleController.createRole);

/* PUT a role_queries */
router.put('/:name', roleValidator(), RoleController.updateRole);

/* DELETE a role_queries */
router.delete('/:name', RoleController.deleteRole);

/* GET a role_queries */
router.get('/:name', RoleController.getRole);

/* GET a role_queries with permissions */
router.get('/with-permissions/:name', RoleController.getRoleWithPermissions);

export default router;
